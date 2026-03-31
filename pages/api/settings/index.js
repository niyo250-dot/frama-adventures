import connect from '../../../lib/db';
import Setting from '../../../models/Setting';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();

  if (req.method === 'GET') {
    const settings = await Setting.findOne();
    return res.status(200).json(settings || {});
  }

  if (!(await verifyToken(req, res))) return;

  if (req.method === 'PUT') {
    const { logoUrl } = req.body;
    let settings = await Setting.findOne();
    if (settings) {
      settings.logoUrl = logoUrl || '';
      await settings.save();
    } else {
      settings = new Setting({ logoUrl: logoUrl || '' });
      await settings.save();
    }
    return res.status(200).json(settings);
  }

  if (req.method === 'DELETE') {
    let settings = await Setting.findOne();
    if (settings) {
      settings.logoUrl = '';
      await settings.save();
    }
    return res.status(200).json({ message: 'deleted' });
  }

  res.status(405).end();
}
