import Axios from 'axios';
import { loadingBegin, loadingDone } from './loaderActions';
import { clearCart } from './cartActions';
import { getOrdersRequest } from './orderActions';
require('dotenv').config();

export const POST_CHARGE_SUCCESS = 'POST_CHARGE_SUCCESS';
export const POST_CHARGE_FAILURE = 'POST_CHARGE_FAILURE';

export const postChargeSuccess = () => ({ type: POST_CHARGE_SUCCESS });
export const postChargeFailure = () => ({ type: POST_CHARGE_FAILURE });

export const createCustomerRequest = customerDetails => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/stripe/customer`;
  try {
    dispatch(loadingBegin());
    const customer = await Axios.post(url, customerDetails);
    return customer.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const postChargeRequest = chargeDetails => async (dispatch, getState) => {
  const url = `${process.env.REACT_APP_API_URL}/stripe/charge`;
  const orderUrl = `${process.env.REACT_APP_API_URL}/orders`;

  const { auth, cart, order } = getState();
  const headers = { headers: { 'user-key': auth.accessToken } };

  try {
    dispatch(loadingBegin());

    const orderDetails = {
      cartId: cart.id,
      shippingId: order.shippingId,
      taxId: 1,
    };

    const orderRes = await Axios.post(orderUrl, orderDetails, headers);
    const orderId = orderRes.data.data;

    const success = await Axios.post(url, { ...chargeDetails, orderId }, headers);
    dispatch(loadingDone());

    dispatch(postChargeSuccess());
    dispatch(getOrdersRequest());
    dispatch(clearCart());
    return success.data.data;
  } catch (error) {
    dispatch(postChargeFailure(error.response.data.message));
  }
};
