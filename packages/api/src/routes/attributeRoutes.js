import express from 'express';
import { AttributeController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const { getAll, getOne, getValues, getProductAttributes } = AttributeController;

router.get('/attributes', redisMiddleware, getAll);
router.get('/attributes/:id', validateId('attribute'), redisMiddleware, getOne);
router.get('/attributes/values/:id', validateId('attribute'), redisMiddleware, getValues);
router.get(
  '/attributes/inProduct/:id',
  validateId('product'),
  redisMiddleware,
  getProductAttributes,
);

export default router;
