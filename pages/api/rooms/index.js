import connect from '../../../lib/db';
import Room from '../../../models/Room';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  if (req.method === 'GET') {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } else if (req.method === 'POST') {
    if (!(await verifyToken(req, res))) return;
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } else {
    res.status(405).end();
  }
}
