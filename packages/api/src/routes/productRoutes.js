import express from 'express';
import { ProductController } from '../controllers';
import { validateId, verifyToken, review } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const {
  getAll,
  getOne,
  search,
  getFromCategory,
  getFromDepartment,
  getLocations,
  postReview,
  getReviews,
} = ProductController;

router.get('/products', redisMiddleware, getAll);
router.get('/products/search', search);
router.get('/products/:id', validateId('product'), redisMiddleware, getOne);
router.get('/products/inCategory/:id', validateId('category'), redisMiddleware, getFromCategory);
router.get(
  '/products/inDepartment/:id',
  validateId('department'),
  redisMiddleware,
  getFromDepartment,
);
router.get('/products/:id/locations', validateId('product'), redisMiddleware, getLocations);
router.get('/products/:id/reviews', validateId('product'), redisMiddleware, getReviews);
router.post('/products/:id/reviews', verifyToken, validateId('product'), review.add, postReview);

export default router;
