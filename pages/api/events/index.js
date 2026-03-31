import connect from '../../../lib/db';
import Event from '../../../models/Event';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();

  if (req.method === 'GET') {
    const events = await Event.find();
    return res.status(200).json(events);
  }

  if (!(await verifyToken(req, res))) return;

  if (req.method === 'POST') {
    const event = new Event(req.body);
    await event.save();
    return res.status(201).json(event);
  }

  res.status(405).end();
}
