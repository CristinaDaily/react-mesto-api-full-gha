import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;

export default function auth(req, res, next) {
  let payload;
  try {
    const token = req.cookies.jwt; //const token = req.headers.authorization;

    if (!token) {
      throw new Error('NotAutanticate');
    }
    //const valideToken = token.replace('Bearer ', '');
    //payload = jwt.verify(valideToken, 'dev_secret');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    if (error.message === 'NotAutanticate') {
      return res.status(401).send({ message: 'Необходима авторизация', error });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'С токеом что-то не так', error });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка', error });
  }
  req.user = payload;
  return next();
}
