import { users } from '../utils/constants.mjs';

export const getUserByIdHandler = (req, res) => {
  const { userIndex } = req;
  const user = users[userIndex];
  if (!user) return res.sendStatus(404);
  return res.send(user);
};
