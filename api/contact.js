export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // QUESTO È L'URL CHE PRENDI DA "APPS SCRIPT" (NON APPSHEET!)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRtlLRd7r1cv_Cb3O39KT4UAoGUzDxhU7jf4yCk6bFuKIPSf1AQMnIPcenIwrBSFvODA/exec';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Errore interno' });
  }
}
