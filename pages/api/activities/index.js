import connect from '../../../lib/db';
import Activity from '../../../models/Activity';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  if (req.method === 'GET') {
    const acts = await Activity.find();
    res.status(200).json(acts);
  } else if (req.method === 'POST') {
    if (!(await verifyToken(req, res))) return;
    const act = new Activity(req.body);
    await act.save();
    res.status(201).json(act);
  } else {
    res.status(405).end();
  }
}
