export default async function handler(req, res) {
  if (req.method === 'POST') {
    const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbzRtlLRd7r1cv_Cb3O39KT4UAoGUzDxhU7jf4yCk6bFuKIPSf1AQMnIPcenIwrBSFvODA/exec';
    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.status(405).send('Metodo non consentito');
  }
}
