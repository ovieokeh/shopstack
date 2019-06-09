import express from 'express';
import { CustomerController } from '../controllers';
import { customer, verifyToken } from '../middlewares';

const router = express.Router();
const { register, login, update, getProfile } = CustomerController;

router.post('/customers', customer.register, register);
router.post('/customers/login', customer.login, login);
router.put('/customers', verifyToken, customer.update, update);
router.put('/customers/creditCard', verifyToken, customer.update, update);
router.put('/customers/address', verifyToken, customer.update, update);
router.get('/customer', verifyToken, getProfile);

export default router;
