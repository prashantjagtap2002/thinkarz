'use server';

import crypto from 'crypto';

const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || '';
const OTP_SECRET = process.env.OTP_SECRET || 'fallback-secret-development-only';

// Helper to create a secure hash of the OTP and phone number
function generateHash(phone: string, otp: string): string {
  return crypto
    .createHmac('sha256', OTP_SECRET)
    .update(`${phone}:${otp}`)
    .digest('hex');
}

export async function sendWhatsAppOtp(countryCode: string, phone: string) {
  try {
    // Format the phone number (remove + and spaces)
    const formattedCode = countryCode.replace(/\D/g, '');
    const formattedPhone = phone.replace(/\D/g, '');
    const to = `${formattedCode}${formattedPhone}`;

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Call the WhatsApp API
    const response = await fetch(
      'https://messaginghub.solutions/relaybridge/api/v1/meta/67f4b113f59e04c3b1511c53/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': WHATSAPP_API_KEY,
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
          biz_opaque_callback_data: 'ThinkarzOTP',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('WhatsApp API Error:', response.status, errorData);
      return { success: false, error: 'Failed to send OTP. Please try again later.' };
    }

    // Generate a hash to return to the client for verification
    const hash = generateHash(to, otp);

    return { success: true, hash };
  } catch (error) {
    console.error('OTP Send Exception:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function verifyWhatsAppOtp(
  countryCode: string,
  phone: string,
  typedOtp: string,
  serverHash: string
) {
  try {
    const formattedCode = countryCode.replace(/\D/g, '');
    const formattedPhone = phone.replace(/\D/g, '');
    const to = `${formattedCode}${formattedPhone}`;

    const calculatedHash = generateHash(to, typedOtp);

    if (calculatedHash === serverHash) {
      return { success: true };
    } else {
      return { success: false, error: 'Invalid OTP' };
    }
  } catch (error) {
    console.error('OTP Verify Exception:', error);
    return { success: false, error: 'Verification failed' };
  }
}
