import express from 'express';
import { ShippingController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const SC = new ShippingController();

router.get('/shipping/regions', redisMiddleware, SC.getAll);
router.get('/shipping/regions/:id', validateId('shipping'), redisMiddleware, SC.getDetails);

export default router;
