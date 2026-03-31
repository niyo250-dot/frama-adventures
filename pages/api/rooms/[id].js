import connect from '../../../lib/db';
import Room from '../../../models/Room';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  const { id } = req.query;
  if (req.method === 'PUT') {
    if (!(await verifyToken(req, res))) return;
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(room);
  } else if (req.method === 'DELETE') {
    if (!(await verifyToken(req, res))) return;
    await Room.findByIdAndDelete(id);
    res.status(200).json({ message: 'deleted' });
  } else {
    res.status(405).end();
  }
}
