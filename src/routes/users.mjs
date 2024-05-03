import { Router } from 'express';
import { users } from '../utils/constants.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import {
  query,
  matchedData,
  checkSchema,
  validationResult,
} from 'express-validator';
import { resolvedIndexByUserId } from '../utils/middlewares.mjs';
import { User } from '../mongosse/schemas/user.mjs';

const router = Router();

router.get(
  '/api/users',
  query('filter')
    .isString()
    .notEmpty()
    .withMessage('Must not be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage('Must be at leas 3-10 characters'),
  (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    console.log(
      req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
          console.log(err);
          throw Error;
        }
        console.log('+++sessionData+++', sessionData);
      })
    );
    console.log(req.sessionID);
    const {
      query: { filter, value },
    } = req;
    const result = validationResult(req);
    if (result.isEmpty())
      return res.send(users.filter((user) => user[filter].includes(value)));
    return res.send(users);
  }
);

// validation schema

router.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const { body } = req;
    const newUser = new User(body);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
);

router.get('/api/users', (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(users.filter((user) => user[filter].includes(value)));
  return res.send(users);
});

router.get('/api/users/:id', resolvedIndexByUserId, (req, res) => {
  const { userIndex } = req;
  const user = users[userIndex];
  if (!user) return res.sendStatus(404);
  return res.status(200).send(user);
});

//PUT
router.put('/api/users/:id', resolvedIndexByUserId, (req, res) => {
  const { userIndex, body } = req;
  users[userIndex] = { id: users[userIndex].id, ...body };
  s;
  return res.status(204).send(users[userIndex]);
});

// PATCH

router.patch('/api/users/:id', resolvedIndexByUserId, (req, res) => {
  const { userIndex, body } = req;
  users[userIndex] = { ...users[userIndex], ...body };
  return res.status(204).send(users[userIndex]);
});

router.delete('/api/users/:id', resolvedIndexByUserId, (req, res) => {
  const { userIndex, body } = req;
  users.splice(userIndex, 1);
  return res.status(200).send(users);
});

export default router;
