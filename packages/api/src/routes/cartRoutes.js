import express from 'express';
import { CartController } from '../controllers';
import { cart as validator, validateId } from '../middlewares';

const router = express.Router();
const CC = new CartController();

router.get('/shoppingcart/generateUniqueId', CartController.generateUniqueId);
router.post('/shoppingcart/add', validator.addToCart, CC.addToCart);
router.get('/shoppingcart/:id', validator.getProducts, CC.getProductsInCart);
router.put(
  '/shoppingcart/:id',
  validateId('item'),
  validator.updateItemQuantity,
  CC.updateProductQuantity,
);
router.get('/shoppingcart/saveForLater/:id', validateId('item'), CC.saveForLater);
router.get('/shoppingcart/getSaved/:id', CC.getSavedItems);
router.get('/shoppingcart/moveToCart/:id', validateId('item'), CC.moveToCart);
router.get('/shoppingcart/totalAmount/:id', validator.getProducts, CC.getTotalAmount);
router.delete('/shoppingcart/removeProduct/:id', validateId('item'), CC.removeFromCart);
router.delete('/shoppingcart/:id', CC.clear);

export default router;
