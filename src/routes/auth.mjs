import { Router } from 'express';
import passport from 'passport';

const router = Router();

// router.post('/api/auth', (req, res) => {
//   const {
//     body: { username, password },
//   } = req;

//   const findUser = users.find((user) => username === user.username);
//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: 'Bad credentials' });
//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

router.post('/api/auth', passport.authenticate('local'), (req, res) => {
  return res.status(200).send(req.user);
});

router.get('/api/auth/status', (req, res) => {
  // req.sessionStore.get(req.sessionID, (err, session) => {
  //   console.log(session);
  // });
  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send({ msg: 'Bad credentials' });
});

router.post('/api/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

export default router;
