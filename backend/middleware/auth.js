import jwt from 'jsonwebtoken';
import AuthenticationError from '../errors/authenticationError.js'

const { NODE_ENV, JWT_SECRET } = process.env;

export default function auth(req, res, next) {
  let payload;
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError('Необходима авторизация');
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    return next(error);
  }

  req.user = payload;
  return next();
}
