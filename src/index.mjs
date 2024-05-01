import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
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

// app.use(logginMiddleware); // middleware globally all endpoints
// app.use(logginMiddleware,logginMiddleware,logginMiddleware); // THEY ARE GOING TO BE SEQUENTYALY CALLED

// GET
// POST
// validation middlerware array
// app.post(
//   '/api/users',
// [
//   body('username')
//     .notEmpty()
//     .withMessage('Must not be empty')
//     .isLength({ min: 5, max: 30 })
//     .withMessage('Must be at leas 5-30 characters')
//     .isString(),
//   body('displayName')
//     .notEmpty()
//     .withMessage('Must not be empty')
//     .isLength({ min: 5, max: 30 })
//     .withMessage('Must be at leas 5-30 characters')
//     .isString(),
// ],
//   (req, res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty())
//       return res.status(400).send({ errors: result.array() });
//     const body = matchedData(req);
//     const newUser = { id: users[users.length - 1].id + 1, ...body };
//     users.push(newUser);
//     res.status(201).send(newUser);
//   }
// );

// localhost:3000
// localhost:3000/users
// localhost:3000/products
// localhost:3000/products?key=value&key2=value2

// PUT => UPDATES EVERTHING
// PATCH => UPDATE PARTIALY , PORTION
// DELETE
// http is statless so we need cookies for manage some state across client/server
