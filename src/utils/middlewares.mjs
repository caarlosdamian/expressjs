export const resolvedIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const userIndex = users.findIndex((user) => user.id === parsedId);
  if (userIndex === -1) return res.sendStatus(404);
  req.userIndex = userIndex; // attached data to the request since we can not passed info to next
  next();
};
