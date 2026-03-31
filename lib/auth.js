import jwt from 'jsonwebtoken';

export function extractToken(req) {
  const authHeader = req.headers.authorization;
  return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
}

export async function verifyToken(req, res) {
  const token = extractToken(req);
  if (!token) {
    if (res) res.status(401).json({ message: 'No token' });
    return false;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    if (res) res.status(401).json({ message: 'Invalid token' });
    return false;
  }
}
