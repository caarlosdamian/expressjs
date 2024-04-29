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
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    const body = matchedData(req);
    const newUser = { id: users[users.length - 1].id + 1, ...body };
    users.push(newUser);
    res.status(201).send(newUser);
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
