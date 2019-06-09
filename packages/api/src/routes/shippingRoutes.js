import express from 'express';
import { ShippingController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const { getAll, getDetails } = ShippingController;

router.get('/shipping/regions', redisMiddleware, getAll);
router.get('/shipping/regions/:id', validateId('shipping'), redisMiddleware, getDetails);

export default router;
