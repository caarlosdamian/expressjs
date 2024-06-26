import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import './strategies/local-strategy.mjs';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser('helloworld'));
  app.use(
    session({
      secret: 'carlos the dev',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session()); // attaching user prop to session
  app.use(routes);
  app.get('/', (request, response) => {
    request.session.visited = true;
    response.cookie('hello', 'world', { maxAge: 60000 * 60 * 2, signed: true });
    response.status(200).send({ mssg: 'Hello' });
  });

  return app;
}
