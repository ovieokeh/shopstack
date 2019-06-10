import express from 'express';
import { OrderController } from '../controllers';
import { verifyToken, order as validator, validateId } from '../middlewares';

const router = express.Router();
const OC = new OrderController();

router.post('/orders', verifyToken, validator.postOrder, OC.postOrder);
router.get('/orders/inCustomer', verifyToken, OC.getCustomerOrders);
router.get('/orders/:id', verifyToken, validateId('order'), OC.getOrderInfo);
router.get('/orders/shortDetail/:id', verifyToken, validateId('order'), OC.getOrderDetails);

export default router;
