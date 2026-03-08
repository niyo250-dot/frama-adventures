import connect from '../../../lib/db';
import Room from '../../../models/Room';
import jwt from 'jsonwebtoken';

async function auth(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return false;
  }
}

export default async function handler(req, res) {
  await connect();
  if (req.method === 'GET') {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } else if (req.method === 'POST') {
    if (!(await auth(req, res))) return;
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } else {
    res.status(405).end();
  }
}
