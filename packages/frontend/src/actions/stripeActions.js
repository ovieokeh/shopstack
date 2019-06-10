import Axios from 'axios';
import { loadingBegin, loadingDone } from './loaderActions';
import { clearCart } from './cartActions';
import { getOrdersRequest } from './orderActions';
require('dotenv').config();

export const POST_CHARGE_SUCCESS = 'POST_CHARGE_SUCCESS';
export const POST_CHARGE_FAILURE = 'POST_CHARGE_FAILURE';

export const postChargeSuccess = () => ({ type: POST_CHARGE_SUCCESS });
export const postChargeFailure = () => ({ type: POST_CHARGE_FAILURE });

export const postChargeRequest = chargeDetails => async (dispatch, getState) => {
  const url = `${process.env.REACT_APP_API_URL}/stripe/charge`;
  const orderUrl = `${process.env.REACT_APP_API_URL}/orders`;

  const { accessToken } = getState().auth;
  const { id } = getState().cart;
  const headers = { headers: { 'user-key': accessToken } };

  try {
    dispatch(loadingBegin());
    const order = await Axios.post(
      orderUrl,
      {
        cartId: id,
        shippingId: 1,
        taxId: 1,
      },
      headers,
    );
    const orderId = order.data.data;

    const success = await Axios.post(url, { ...chargeDetails, orderId }, headers);
    dispatch(loadingDone());

    dispatch(postChargeSuccess());
    dispatch(getOrdersRequest());
    dispatch(clearCart());
    return success;
  } catch (error) {
    dispatch(postChargeFailure(error.response.data.message));
  }
};
