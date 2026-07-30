'use server';

import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

function getOtpSecret(): string {
  const secret = process.env.OTP_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL SECURITY ERROR: OTP_SECRET environment variable is missing.');
    }
    return 'fallback-secret-development-only-replace-in-env';
  }
  return secret;
}

// Helper to create a secure hash of the OTP, phone number, and timestamp
function generateHash(phone: string, otp: string, timestamp: number): string {
  return crypto
    .createHmac('sha256', getOtpSecret())
    .update(`${phone}:${otp}:${timestamp}`)
    .digest('hex');
}

async function getDailyOtpCount(fullPhone: string): Promise<number> {
  try {
    const supabase = await createClient();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count, error } = await supabase
      .from('otp_logs')
      .select('*', { count: 'exact', head: true })
      .eq('full_phone', fullPhone)
      .eq('action', 'send_otp')
      .eq('status', 'sent')
      .gte('created_at', twentyFourHoursAgo);

    if (error) {
      console.warn('Could not query OTP count from Supabase:', error.message);
      return 0;
    }
    return count || 0;
  } catch (err) {
    return 0;
  }
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
    const supabase = await createClient();
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
    // 1. Rate Limiting: Max 5 OTP requests per phone number per 24 hours
    const dailyCount = await getDailyOtpCount(to);
    if (dailyCount >= 5) {
      const limitMsg = 'Daily OTP limit reached (5 per day) for this phone number. Please try again tomorrow.';
      await logOtpEvent({
        country_code: countryCode,
        phone: phone,
        full_phone: to,
        action: 'send_otp',
        status: 'rate_limited',
        error_message: limitMsg,
      });
      return { success: false, error: limitMsg };
    }

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

    // Generate a cryptographically secure random 4-digit OTP
    const otp = crypto.randomInt(1000, 10000).toString();

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

    // 2. Generate a timestamped secure hash (5-minute validity)
    const timestamp = Date.now();
    const signature = generateHash(to, otp, timestamp);
    const hash = `${timestamp}.${signature}`;

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
    if (!serverHash || !serverHash.includes('.')) {
      return { success: false, error: 'Invalid or expired OTP token. Please resend code.' };
    }

    const [timestampStr, signature] = serverHash.split('.');
    const timestamp = parseInt(timestampStr, 10);

    if (isNaN(timestamp)) {
      return { success: false, error: 'Malformed verification token.' };
    }

    // Check 5-minute expiration (5 * 60 * 1000 = 300,000 ms)
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      await logOtpEvent({
        country_code: countryCode,
        phone: phone,
        full_phone: to,
        action: 'verify_otp',
        status: 'expired',
        error_message: 'OTP expired (exceeded 5 minutes)',
      });
      return { success: false, error: 'OTP has expired (valid for 5 minutes). Please click Resend OTP.' };
    }

    const expectedSignature = generateHash(to, typedOtp, timestamp);

    if (signature === expectedSignature) {
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
