import Axios from 'axios';
require('dotenv').config();

export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';

export const getOrdersSuccess = orders => ({ type: GET_ORDERS_SUCCESS, payload: orders });

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
