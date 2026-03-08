import connect from '../../../lib/db';
import About from '../../../models/About';
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
    const page = await About.findOne();
    res.status(200).json(page || {});
  } else if (req.method === 'POST' || req.method === 'PUT') {
    if (!(await auth(req, res))) return;
    const { whoWeAre, ourTeam } = req.body;
    let page = await About.findOne();
    if (page) {
      page.whoWeAre = whoWeAre;
      page.ourTeam = ourTeam;
      await page.save();
    } else {
      page = new About({ whoWeAre, ourTeam });
      await page.save();
    }
    res.status(200).json(page);
  } else {
    res.status(405).end();
  }
}
