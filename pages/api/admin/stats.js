import connect from '../../../lib/db';
import Booking from '../../../models/Booking';
import Room from '../../../models/Room';
import Activity from '../../../models/Activity';
import GalleryImage from '../../../models/GalleryImage';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  await connect();
  const bookings = await Booking.countDocuments();
  const rooms = await Room.countDocuments();
  const activities = await Activity.countDocuments();
  const images = await GalleryImage.countDocuments();
  res.status(200).json({ bookings, rooms, activities, images });
}
