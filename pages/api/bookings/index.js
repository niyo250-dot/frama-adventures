import connect from '../../../lib/db';
import Booking from '../../../models/Booking';
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
  if (req.method === 'GET') {
    if (!(await auth(req, res))) return;
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } else if (req.method === 'PUT') {
    if (!(await auth(req, res))) return;
    const { id, ...data } = req.body;
    const b = await Booking.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(b);
  } else {
    res.status(405).end();
  }
}
