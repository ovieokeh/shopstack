import Axios from 'axios';
require('dotenv').config();

export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_SHIPPING_TYPE_SUCCESS = 'GET_SHIPPING_TYPE_SUCCESS';
export const SET_SHIPPING_COST = 'SET_SHIPPING_COST';

export const getOrdersSuccess = orders => ({ type: GET_ORDERS_SUCCESS, payload: orders });
export const getShippingTypeSuccess = shippingTypes => ({
  type: GET_SHIPPING_TYPE_SUCCESS,
  payload: shippingTypes,
});

export const getOrdersRequest = () => async (dispatch, getState) => {
  const url = `${process.env.REACT_APP_API_URL}/orders/inCustomer`;
  const { accessToken } = getState().auth;
  const headers = { headers: { 'user-key': accessToken } };

  try {
    const orders = await Axios.get(url, headers);
    dispatch(getOrdersSuccess(orders.data.data));
  } catch (error) {
    console.log(error.message);
    // do something with the error
  }
};

export const getOrderRequest = id => async (dispatch, getState) => {
  const url = `${process.env.REACT_APP_API_URL}/orders/${id}`;
  const { accessToken } = getState().auth;
  const headers = { headers: { 'user-key': accessToken } };

  try {
    const order = await Axios.get(url, headers);
    return order.data.data;
  } catch (error) {
    console.log(error.message);
    // do something with the error
  }
};

export const getShippingTypesRequest = shippingRegionId => async () => {
  const url = `${process.env.REACT_APP_API_URL}/shipping/regions/${shippingRegionId}`;

  try {
    const shippingTypes = await Axios.get(url);
    return shippingTypes.data.data;
  } catch (error) {
    // do something
  }
};

export const setShippingRequest = cost => async dispatch => {
  dispatch({
    type: SET_SHIPPING_COST,
    payload: cost,
  });
};
