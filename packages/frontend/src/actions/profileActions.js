import Axios from 'axios';
import dotenv from 'dotenv';
import { notifyError, notifyClear } from './notificationActions';

dotenv.config();

export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_BEGIN = 'UPDATE_CUSTOMER_BEGIN';

export const updateCustomerSuccess = customer => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const updateCustomerRequest = (type, customerDetails) => async (dispatch, getState) => {
  let url;

  switch (type) {
    case 'address':
      url = `${process.env.REACT_APP_API_URL}/customers/address`;
      break;

    case 'credit':
      url = `${process.env.REACT_APP_API_URL}/customers/creditCard`;
      break;

    default:
      url = `${process.env.REACT_APP_API_URL}/customers`;
  }

  const { accessToken } = getState().auth;

  try {
    dispatch(notifyClear());
    const success = await Axios.put(url, customerDetails, { headers: { 'user-key': accessToken } });

    dispatch(updateCustomerSuccess(success.data.data));

    return true;
  } catch (error) {
    dispatch(notifyError(error.response.data));
  }

  return false;
};
