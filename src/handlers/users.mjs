import { matchedData, validationResult } from 'express-validator';
import { User } from '../mongosse/schemas/user.mjs';
import { users } from '../utils/constants.mjs';
import { hashPassword } from '../utils/helpers.mjs';

export const getUserByIdHandler = (req, res) => {
  const { userIndex } = req;
  const user = users[userIndex];
  if (!user) return res.sendStatus(404);
  return res.send(user);
};

export const createUserHandler = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  data.password = await hashPassword(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.sendStatus(400);
  }
};
