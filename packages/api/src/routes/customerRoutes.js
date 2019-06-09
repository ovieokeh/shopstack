import express from 'express';
import { CustomerController } from '../controllers';
import { customer, verifyToken } from '../middlewares';

const router = express.Router();
const { register, login, update } = CustomerController;

router.post('/customers', customer.register, register);
router.post('/customers/login', customer.login, login);
router.put('/customers', verifyToken, customer.update, update);

export default router;
