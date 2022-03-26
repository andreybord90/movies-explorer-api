import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

import router from './src/routes/user.js';
import routerMovie from './src/routes/movie.js';

import identity from './src/routes/identity.js'
import { errorHandler } from './src/middlewares/errors-handler.js';
import { auth } from './src/middlewares/auth.js';

import { NotFoundError } from './src/errors/index.js';

import { requestLogger, errorLogger } from './src/middlewares/logger.js';
import { corsOptions } from './src/middlewares/cors.js';

dotenv.config();

const { PORT = 3000, DB_URL } = process.env;
const { connect } = mongoose;
const app = express();

connect(DB_URL);

app.use(corsOptions);
app.use(helmet());

app.use(express.json());
app.use(requestLogger);

app.use(identity);

app.use(auth);

app.use('/', router);
app.use('/', routerMovie);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
