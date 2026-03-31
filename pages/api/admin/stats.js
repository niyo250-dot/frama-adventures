import connect from '../../../lib/db';
import Booking from '../../../models/Booking';
import Room from '../../../models/Room';
import Activity from '../../../models/Activity';
import GalleryImage from '../../../models/GalleryImage';
import Event from '../../../models/Event';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (!(await verifyToken(req, res))) return;
  await connect();
  const bookings = await Booking.countDocuments();
  const rooms = await Room.countDocuments();
  const activities = await Activity.countDocuments();
  const images = await GalleryImage.countDocuments();
  const events = await Event.countDocuments();
  res.status(200).json({ bookings, rooms, activities, images, events });
}
