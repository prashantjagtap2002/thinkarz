export const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxyJJXslQncg-C3XvlLTms9ZdibW-zwNzLXl3mgkNkdxN-0ecTY8Di1sh3yNaEH8LX1/exec';

export async function submitToGoogleSheets(payload: Record<string, any>): Promise<boolean> {
  try {
    // Using no-cors mode as Google Apps Script web apps return a 302 redirect that browsers block in normal CORS mode.
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error('Error submitting lead to Google Sheets:', error);
    return false;
  }
}
