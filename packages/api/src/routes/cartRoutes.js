import express from 'express';
import { CartController } from '../controllers';
import { cart as validator, validateId } from '../middlewares';

const router = express.Router();
const {
  generateUniqueId,
  addToCart,
  getProductsInCart,
  updateProductQuantity,
  clear,
  saveForLater,
  getSavedItems,
  moveToCart,
  removeFromCart,
  getTotalAmount,
} = CartController;

router.get('/shoppingcart/generateUniqueId', generateUniqueId);
router.post('/shoppingcart/add', validator.addToCart, addToCart);
router.get('/shoppingcart/:id', validator.getProducts, getProductsInCart);
router.put(
  '/shoppingcart/:id',
  validateId('item'),
  validator.updateItemQuantity,
  updateProductQuantity,
);
router.get('/shoppingcart/saveForLater/:id', validateId('item'), saveForLater);
router.get('/shoppingcart/getSaved/:id', getSavedItems);
router.get('/shoppingcart/moveToCart/:id', validateId('item'), moveToCart);
router.get('/shoppingcart/totalAmount/:id', validator.getProducts, getTotalAmount);
router.delete('/shoppingcart/removeProduct/:id', validateId('item'), removeFromCart);
router.delete('/shoppingcart/:id', clear);

export default router;
