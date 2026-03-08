export default function handler(req, res) {
  if (req.method === 'POST') {
    // just echo for now or integrate email service
    console.log('Contact form submitted', req.body);
    return res.status(200).json({ message: 'Received' });
  }
  res.status(405).end();
}
