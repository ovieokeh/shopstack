import express from 'express';
import { CustomerController } from '../controllers';
import { customer } from '../middlewares';

const router = express.Router();
const { register, login } = CustomerController;

router.post('/customers', customer.register, register);
router.post('/customers/login', customer.login, login);

export default router;
