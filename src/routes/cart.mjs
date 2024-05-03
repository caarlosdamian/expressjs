import { Router } from 'express';

const router = Router();

router.post('/api/cart', (req, res) => {
  if (!req.session.user) res.status(401).send({ msg: 'Bad credentials' });
  const { body: item } = req;

  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

router.get('/api/cart', (req, res) => {
  if (!req.session.user) res.status(401).send({ msg: 'Bad credentials' });

  const { cart } = req.session;
  return res.status(200).send(cart ?? []);
});

export default router;
