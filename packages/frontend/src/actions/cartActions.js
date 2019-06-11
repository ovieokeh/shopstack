import Axios from 'axios';
import shortID from 'short-uuid';
require('dotenv').config();

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCartAction = (productId, details) => async (dispatch, getState) => {
  const { attributes, quantity } = details;
  const { cart } = getState();

  const cartId = cart.id || shortID.generate();

  try {
    const updatedCart = await postToCart({
      attributes: attributes.toString(),
      productId,
      cartId,
      quantity,
    });

    const cartTotal = await getTotalAmount(cartId);
    const newCart = prepareCartObject(cartId, updatedCart.data.data, cartTotal);

    dispatch({ type: ADD_TO_CART, payload: newCart });
  } catch (error) {
    // do something with error
    console.log(error.message);
  }
};

export const updateItemQuantity = ({ itemId, quantity }) => async (dispatch, getState) => {
  const url = `${process.env.REACT_APP_API_URL}/shoppingcart/${itemId}`;
  const { cart } = getState();

  try {
    const success = await Axios.put(url, { quantity });
    const updatedCart = await getItemsInCart(cart.id);
    const cartTotal = await getTotalAmount(cart.id);
    const newCart = prepareCartObject(cart.id, updatedCart.data.data, cartTotal);

    dispatch({ type: ADD_TO_CART, payload: newCart });
    return success;
  } catch (error) {
    // do something with error
  }
};

export const removeProductFromCart = itemId => async (dispatch, getState) => {
  const { cart } = getState();

  await removeFromCart(itemId);
  const newCartDetails = await getItemsInCart(cart.id);
  if (!newCartDetails) {
    dispatch(clearCart());
    return;
  }

  const cartTotal = await getTotalAmount(cart.id);
  const newCart = prepareCartObject(cart.id, newCartDetails.data.data, cartTotal);

  dispatch({
    type: REMOVE_FROM_CART,
    payload: newCart,
  });
};

export const clearCart = () => ({ type: CLEAR_CART });

// Helper functions ================================================================================
const prepareCartObject = (cartId, items, totalPrice) => ({
  id: cartId,
  items,
  count: items.length,
  totalPrice,
});

const getItemsInCart = async cartId => {
  try {
    const items = await Axios.get(`${process.env.REACT_APP_API_URL}/shoppingcart/${cartId}`);
    return items;
  } catch (error) {
    return null;
  }
};

const getTotalAmount = async cartId => {
  try {
    const res = await Axios.get(
      `${process.env.REACT_APP_API_URL}/shoppingcart/totalAmount/${cartId}`,
    );
    const { totalAmount } = res.data.data;
    return totalAmount;
  } catch (error) {
    return null;
  }
};

const postToCart = async details => {
  const url = `${process.env.REACT_APP_API_URL}/shoppingcart/add`;

  try {
    const success = await Axios.post(url, details);
    return success;
  } catch (error) {
    // do something with error
  }
};

const removeFromCart = async itemId => {
  const url = `${process.env.REACT_APP_API_URL}/shoppingcart/removeProduct/${itemId}`;

  try {
    const success = await Axios.delete(url);
    return success;
  } catch (error) {
    // do something with error
  }
};

// ==================================================================================================
