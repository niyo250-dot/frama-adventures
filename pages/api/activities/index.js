import connect from '../../../lib/db';
import Activity from '../../../models/Activity';
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
    const acts = await Activity.find();
    res.status(200).json(acts);
  } else if (req.method === 'POST') {
    if (!(await auth(req, res))) return;
    const act = new Activity(req.body);
    await act.save();
    res.status(201).json(act);
  } else {
    res.status(405).end();
  }
}
