import express from 'express';
import { CustomerController } from '../controllers';
import { customer, verifyToken } from '../middlewares';

const router = express.Router();
const CC = new CustomerController();

router.post('/customers', customer.register, CC.register);
router.post('/customers/login', customer.login, CustomerController.login);
router.put('/customers', verifyToken, customer.update, CC.update);
router.put('/customers/creditCard', verifyToken, customer.update, CC.update);
router.put('/customers/address', verifyToken, customer.update, CC.update);
router.get('/customer', verifyToken, CustomerController.getProfile);

export default router;
