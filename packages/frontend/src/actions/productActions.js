import Axios from 'axios';
import dotenv from 'dotenv';
import { loadingBegin, loadingDone } from './loaderActions';

dotenv.config();

export const GET_PRODUCT_BEGIN = 'GET_PRODUCT_BEGIN';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_REVIEWS_SUCCESS = 'GET_PRODUCT_REVIEWS_SUCCESS';

export const getProductBegin = () => ({ type: GET_PRODUCT_BEGIN });

export const getProductSuccess = products => ({
  type: GET_PRODUCT_SUCCESS,
  payload: products,
});

export const getProductReviewsSuccess = reviews => ({
  type: GET_PRODUCT_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getProductRequest = id => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/products/${id}`;

  try {
    dispatch(loadingBegin());
    dispatch(getProductBegin());

    const success = await Axios.get(url);

    dispatch(loadingDone());
    dispatch(getProductSuccess(success.data.data));
    await dispatch(getProductReviewsRequest(id));

    return true;
  } catch (error) {
    setTimeout(() => {
      dispatch(loadingDone());
    }, 1000);
  }

  return false;
};

export const getProductReviewsRequest = id => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/products/${id}/reviews`;

  try {
    const success = await Axios.get(url);
    dispatch(getProductReviewsSuccess(success.data.data || []));
    return true;
  } catch (error) {
    // do nothing
  }

  return false;
};
