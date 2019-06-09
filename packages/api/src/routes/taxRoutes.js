import express from 'express';
import { TaxController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const { getAll, getOne } = TaxController;

router.get('/tax', redisMiddleware, getAll);
router.get('/tax/:id', validateId('tax'), redisMiddleware, getOne);

export default router;
