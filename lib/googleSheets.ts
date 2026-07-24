export const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxyJJXslQncg-C3XvlLTms9ZdibW-zwNzLXl3mgkNkdxN-0ecTY8Di1sh3yNaEH8LX1/exec';

export async function submitToGoogleSheets(payload: Record<string, any>): Promise<boolean> {
  try {
    console.log('Sending payload to Google Sheets:', payload);

    const params = new URLSearchParams();
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== null) {
        params.append(key, String(payload[key]));
      }
    });

    // Use x-www-form-urlencoded which is natively parsed by Google Apps Script into e.parameter
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('Successfully posted payload to Google Sheets Web App');
    return true;
  } catch (error) {
    console.error('Error submitting lead to Google Sheets:', error);
    return false;
  }
}
