import connect from '../../../lib/db';
import Booking from '../../../models/Booking';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  if (req.method === 'GET') {
    if (!(await verifyToken(req, res))) return;
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } else if (req.method === 'PUT') {
    if (!(await verifyToken(req, res))) return;
    const { id, ...data } = req.body;
    const b = await Booking.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(b);
  } else {
    res.status(405).end();
  }
}
