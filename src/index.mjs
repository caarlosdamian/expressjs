import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './strategies/local-strategy.mjs';

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
  })
);
app.use(passport.initialize());
app.use(passport.session()); // attaching user prop to session
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  console.log(request.session);
  console.log(request.sessionID);
  request.session.visited = true;
  response.cookie('hello', 'world', { maxAge: 60000 * 60 * 2, signed: true });
  response.status(200).send({ mssg: 'Hello' });
});

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
