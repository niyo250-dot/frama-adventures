import connect from '../../../lib/db';
import GalleryImage from '../../../models/GalleryImage';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  if (req.method === 'GET') {
    const imgs = await GalleryImage.find();
    res.status(200).json(imgs);
  } else if (req.method === 'POST') {
    if (!(await verifyToken(req, res))) return;
    const img = new GalleryImage(req.body);
    await img.save();
    res.status(201).json(img);
  } else {
    res.status(405).end();
  }
}
