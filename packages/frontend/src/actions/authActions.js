import Axios from 'axios';
import dotenv from 'dotenv';
import { notifyError } from './notificationActions';
import { loadingBegin, loadingDone } from './loaderActions';

dotenv.config();

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_BEGIN = 'AUTH_BEGIN';
export const LOGOUT = 'LOGOUT';

export const registerSuccess = customer => ({
  type: AUTH_SUCCESS,
  payload: customer,
});

export const registerBegin = () => ({ type: AUTH_BEGIN });

export const logoutRequest = () => ({ type: LOGOUT });

export const registerRequest = customerDetails => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/customers`;

  try {
    dispatch(loadingBegin());
    const success = await Axios.post(url, customerDetails);

    setTimeout(() => {
      dispatch(loadingDone());
      dispatch(registerSuccess(success.data.data));
    }, 1000);

    return true;
  } catch (error) {
    setTimeout(() => {
      dispatch(loadingDone());
      dispatch(notifyError(error.response.data));
    }, 1000);
  }

  return false;
};

export const loginRequest = customerDetails => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/customers/login`;

  try {
    dispatch(loadingBegin());
    const success = await Axios.post(url, customerDetails);

    setTimeout(() => {
      dispatch(loadingDone());
      dispatch(registerSuccess(success.data.data));
    }, 1000);

    return true;
  } catch (error) {
    setTimeout(() => {
      dispatch(loadingDone());
      dispatch(notifyError(error.response.data));
    }, 1000);
  }

  return false;
};
