import express from 'express';
import { AttributeController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const AC = new AttributeController();

router.get('/attributes', redisMiddleware, AC.getAll);
router.get('/attributes/:id', validateId('attribute'), redisMiddleware, AC.getOne);
router.get('/attributes/values/:id', validateId('attribute'), redisMiddleware, AC.getValues);
router.get(
  '/attributes/inProduct/:id',
  validateId('product'),
  redisMiddleware,
  AC.getProductAttributes,
);

export default router;
