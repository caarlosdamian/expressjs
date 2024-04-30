import { Router, response } from 'express';

const router = Router();

router.get('/api/products', (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  if (req.signedCookies?.hello && req.signedCookies?.hello === 'world')
    return res.send([{ id: 1, name: 'keyboard', price: 12.999 }]);
  return res.status(403).send({ msg: 'Sorry you need cookie' });
});

export default router;
