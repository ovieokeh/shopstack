import express from 'express';
import { TaxController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const TC = new TaxController();

router.get('/tax', redisMiddleware, TC.getAll);
router.get('/tax/:id', validateId('tax'), redisMiddleware, TC.getOne);

export default router;
