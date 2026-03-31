import connect from '../../../lib/db';
import Event from '../../../models/Event';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  const { id } = req.query;

  if (!(await verifyToken(req, res))) return;

  if (req.method === 'PUT') {
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(event);
  }

  if (req.method === 'DELETE') {
    await Event.findByIdAndDelete(id);
    return res.status(200).json({ message: 'deleted' });
  }

  res.status(405).end();
}
