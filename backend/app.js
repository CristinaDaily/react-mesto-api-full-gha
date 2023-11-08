import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { requestLogger, errorLogger } from './middleware/logger.js';
import NotFoundError from './errors/notFoundErr.js'

import 'dotenv/config';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors({ origin: ['http://localhost:3001', 'https://mestoproject.nomoredomainsrocks.ru'], credentials: true, maxAge: 60 }));
app.use(json());
app.use(cookieParser());
app.use(requestLogger);

app.use(router);

app.use((req, res, next) => {
  const error = new NotFoundError('Маршрут не найден');
  next(error);
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

init();
