import { Router } from 'express';

const router = Router();

router.get('/api/products', (req, res) => {
  res.send([{ id: 1, name: 'keyboard', price: 12.999 }]);
});

export default router;
