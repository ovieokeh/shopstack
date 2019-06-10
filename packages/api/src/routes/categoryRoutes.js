import express from 'express';
import { CategoryController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const CC = new CategoryController();

router.get('/categories', redisMiddleware, CC.getAll);
router.get('/categories/:id', validateId('category'), redisMiddleware, CC.getOne);
router.get(
  '/categories/inDepartment/:id',
  validateId('department'),
  redisMiddleware,
  CC.getDepartmentCategories,
);
router.get(
  '/categories/inProduct/:id',
  validateId('product'),
  redisMiddleware,
  CC.getProductCategories,
);

export default router;
