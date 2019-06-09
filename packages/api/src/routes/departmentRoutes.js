import express from 'express';
import { DepartmentController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const { getAll, getOne } = DepartmentController;

router.get('/departments', redisMiddleware, getAll);
router.get('/departments/:id', validateId('department'), redisMiddleware, getOne);

export default router;
