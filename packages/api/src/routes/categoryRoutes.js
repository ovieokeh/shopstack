import express from 'express';
import { CategoryController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const { getAll, getOne, getDepartmentCategories, getProductCategories } = CategoryController;

router.get('/categories', redisMiddleware, getAll);
router.get('/categories/:id', validateId('category'), redisMiddleware, getOne);
router.get(
  '/categories/inDepartment/:id',
  validateId('department'),
  redisMiddleware,
  getDepartmentCategories,
);
router.get(
  '/categories/inProduct/:id',
  validateId('product'),
  redisMiddleware,
  getProductCategories,
);

export default router;
