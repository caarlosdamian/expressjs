import { Router } from 'express';

const router = Router();

router.get('/api/products', (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  if (req.signedCookies?.hello && req.signedCookies?.hello === 'world')
    return res.send([{ id: 1, name: 'keyboard', price: 12.999 }]);
  return res.status(403).send({ msg: 'Sorry you need cookie' });
});

export default router;

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
