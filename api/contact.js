export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // QUESTO È L'URL CHE PRENDI DA "APPS SCRIPT" (NON APPSHEET!)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/library/d/103tM0-nJFWsRT3X6V0IAODOEKXx9v_HG6JIzLG7tLu4RxKfZ-ewbgi7S/3';

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
