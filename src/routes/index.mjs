import { Router } from 'express';
import userRouter from './users.mjs';
import productRouter from './products.mjs';
import authRouter from './auth.mjs';
import cartRouter from './cart.mjs';

const router = Router();

router.use(cartRouter);
router.use(userRouter);
router.use(authRouter);
router.use(productRouter);

export default router;
