'use server';

import crypto from 'crypto';
import { createClient } from '@/utils/supabase/client';

const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || '';
const OTP_SECRET = process.env.OTP_SECRET || 'fallback-secret-development-only';

// Helper to create a secure hash of the OTP and phone number
function generateHash(phone: string, otp: string): string {
  return crypto
    .createHmac('sha256', OTP_SECRET)
    .update(`${phone}:${otp}`)
    .digest('hex');
}

async function logOtpEvent(data: {
  country_code: string;
  phone: string;
  full_phone: string;
  action: string;
  status: string;
  error_message?: string | null;
}) {
  try {
    const supabase = createClient();
    await supabase.from('otp_logs').insert([data]);
  } catch (err) {
    console.error('Failed to write OTP log to Supabase:', err);
  }
}

export async function sendWhatsAppOtp(countryCode: string, phone: string) {
  const formattedCode = countryCode.replace(/\D/g, '');
  const formattedPhone = phone.replace(/\D/g, '');
  const to = `${formattedCode}${formattedPhone}`;

  try {
    const apiKey = process.env.WHATSAPP_API_KEY || '';
    if (!apiKey) {
      const errMsg = 'WHATSAPP_API_KEY is missing in your .env.local file.';
      console.error('WhatsApp API Key Missing:', errMsg);
      await logOtpEvent({
        country_code: countryCode,
        phone: phone,
        full_phone: to,
        action: 'send_otp',
        status: 'failed',
        error_message: errMsg,
      });
      return { success: false, error: errMsg };
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Call the WhatsApp API
    const response = await fetch(
      'https://messaginghub.solutions/relaybridge/api/v1/meta/67ff5b35f59e04c3b1513294/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to,
          type: 'template',
          template: {
            name: 'registration',
            language: {
              code: 'en',
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: otp,
                  },
                ],
              },
              {
                type: 'button',
                parameters: [
                  {
                    type: 'text',
                    text: otp,
                  },
                ],
                sub_type: 'url',
                index: '0',
              },
            ],
          },
          biz_opaque_callback_data: 'THINKARZOTP',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('WhatsApp API Error:', response.status, errorData);
      await logOtpEvent({
        country_code: countryCode,
        phone: phone,
        full_phone: to,
        action: 'send_otp',
        status: 'failed',
        error_message: errorData || `HTTP ${response.status}`,
      });
      return { success: false, error: errorData || `WhatsApp API error (${response.status})` };
    }

    // Generate a hash to return to the client for verification
    const hash = generateHash(to, otp);

    await logOtpEvent({
      country_code: countryCode,
      phone: phone,
      full_phone: to,
      action: 'send_otp',
      status: 'sent',
      error_message: null,
    });

    return { success: true, hash };
  } catch (error: any) {
    console.error('OTP Send Exception:', error);
    await logOtpEvent({
      country_code: countryCode,
      phone: phone,
      full_phone: to,
      action: 'send_otp',
      status: 'error',
      error_message: error?.message || String(error),
    });
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function verifyWhatsAppOtp(
  countryCode: string,
  phone: string,
  typedOtp: string,
  serverHash: string
) {
  const formattedCode = countryCode.replace(/\D/g, '');
  const formattedPhone = phone.replace(/\D/g, '');
  const to = `${formattedCode}${formattedPhone}`;

  try {
    const calculatedHash = generateHash(to, typedOtp);

    if (calculatedHash === serverHash) {
      await logOtpEvent({
        country_code: countryCode,
        phone: phone,
        full_phone: to,
        action: 'verify_otp',
        status: 'verified',
        error_message: null,
      });
      return { success: true };
    } else {
      await logOtpEvent({
        country_code: countryCode,
        phone: phone,
        full_phone: to,
        action: 'verify_otp',
        status: 'invalid_otp',
        error_message: 'Invalid OTP entered',
      });
      return { success: false, error: 'Invalid OTP' };
    }
  } catch (error: any) {
    console.error('OTP Verify Exception:', error);
    await logOtpEvent({
      country_code: countryCode,
      phone: phone,
      full_phone: to,
      action: 'verify_otp',
      status: 'error',
      error_message: error?.message || String(error),
    });
    return { success: false, error: 'Verification failed' };
  }
}
