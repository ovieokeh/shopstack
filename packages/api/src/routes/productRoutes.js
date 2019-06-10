import express from 'express';
import { ProductController } from '../controllers';
import { validateId, verifyToken, review } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const PC = new ProductController();

router.get('/products', redisMiddleware, PC.getAll);
router.get('/products/search', PC.search);
router.get('/products/:id', validateId('product'), redisMiddleware, PC.getOne);
router.get('/products/inCategory/:id', validateId('category'), redisMiddleware, PC.getFromCategory);
router.get(
  '/products/inDepartment/:id',
  validateId('department'),
  redisMiddleware,
  PC.getFromDepartment,
);
router.get('/products/:id/locations', validateId('product'), redisMiddleware, PC.getLocations);
router.get('/products/:id/reviews', validateId('product'), redisMiddleware, PC.getReviews);
router.post('/products/:id/reviews', verifyToken, validateId('product'), review.add, PC.postReview);

export default router;
