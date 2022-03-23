import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'God-is-Love'
    );
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация!!');
  }

  req.user = payload;

  next();
};

const generateToken = (payload) => {
  const token = jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : 'God-is-Love',
    { expiresIn: '7d' }
  );
  return token;
};

export { auth, generateToken };
