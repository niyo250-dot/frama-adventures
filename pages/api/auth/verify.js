import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!(await verifyToken(req, res))) return;
  res.status(200).json({ ok: true });
}
