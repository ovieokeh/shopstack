import express from 'express';
import { CustomerController } from '../controllers';
import { customer, verifyToken } from '../middlewares';

const router = express.Router();
const { register } = CustomerController;

router.post('/customers', customer.register, register);

export default router;
