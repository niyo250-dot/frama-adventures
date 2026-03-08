import connect from '../../../lib/db';
import Room from '../../../models/Room';
import jwt from 'jsonwebtoken';

async function auth(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    res.status(401).json({ message: 'Invalid token' });
    return false;
  }
}

export default async function handler(req, res) {
  await connect();
  const { id } = req.query;
  if (req.method === 'PUT') {
    if (!(await auth(req, res))) return;
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(room);
  } else if (req.method === 'DELETE') {
    if (!(await auth(req, res))) return;
    await Room.findByIdAndDelete(id);
    res.status(200).json({ message: 'deleted' });
  } else {
    res.status(405).end();
  }
}
