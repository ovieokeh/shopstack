import express from 'express';
import { DepartmentController } from '../controllers';
import { validateId } from '../middlewares';
import redisMiddleware from '../redis';

const router = express.Router();
const DC = new DepartmentController();

router.get('/departments', redisMiddleware, DC.getAll);
router.get('/departments/:id', validateId('department'), redisMiddleware, DC.getOne);

export default router;
