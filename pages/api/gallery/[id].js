import connect from '../../../lib/db';
import GalleryImage from '../../../models/GalleryImage';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await connect();
  const { id } = req.query;
  if (req.method === 'DELETE') {
    if (!(await verifyToken(req, res))) return;
    await GalleryImage.findByIdAndDelete(id);
    res.status(200).json({ message: 'deleted' });
  } else {
    res.status(405).end();
  }
}
