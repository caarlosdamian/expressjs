import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/api/auth/discord',
  passport.authenticate('discord', (req, res) => {})
);

router.get(
  '/api/auth/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    return res.status(200).send(req.user);
  }
);

export default router;
