import express from 'express';
import { OrderController } from '../controllers';
import { verifyToken, order as validator, validateId } from '../middlewares';

const router = express.Router();
const { postOrder, getOrderInfo, getOrderDetails, getCustomerOrders } = OrderController;

router.post('/orders', verifyToken, validator.postOrder, postOrder);
router.get('/orders/inCustomer', verifyToken, getCustomerOrders);
router.get('/orders/:id', verifyToken, validateId('order'), getOrderInfo);
router.get('/orders/shortDetail/:id', verifyToken, validateId('order'), getOrderDetails);

export default router;
