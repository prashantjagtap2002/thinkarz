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

    // Append parameters to query string AND send in body for maximum compatibility with Google Apps Script redirect behavior
    const urlWithParams = `${GOOGLE_SHEETS_WEB_APP_URL}?${params.toString()}`;

    await fetch(urlWithParams, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log('Successfully posted payload to Google Sheets Web App');
    return true;
  } catch (error) {
    console.error('Error submitting lead to Google Sheets:', error);
    return false;
  }
}
