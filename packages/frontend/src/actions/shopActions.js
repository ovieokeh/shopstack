import Axios from 'axios';
import dotenv from 'dotenv';
import { loadingBegin, loadingDone } from './loaderActions';

dotenv.config();

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_DEPARTMENTS_SUCCESS = 'GET_DEPARTMENTS_SUCCESS';

export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getDepartmentsSuccess = departments => ({
  type: GET_DEPARTMENTS_SUCCESS,
  payload: departments,
});

export const getProductsRequest = params => async dispatch => {
  let url;
  const { page, limit, filter } = params;

  if (filter) {
    switch (filter.type) {
      case 'department':
        url = `${process.env.REACT_APP_API_URL}/products/inDepartment/${
          filter.id
        }?page=${page}&descriptionLength=50&limit=${limit}`;
        break;

      default:
        url = `${process.env.REACT_APP_API_URL}/products/inCategory/${
          filter.id
        }?page=${page}&descriptionLength=50&limit=${limit}`;
    }
  } else {
    url = `${
      process.env.REACT_APP_API_URL
    }/products?page=${page}&descriptionLength=50&limit=${limit}`;
  }

  try {
    dispatch(loadingBegin());
    const success = await Axios.get(url);

    setTimeout(() => {
      dispatch(loadingDone());
      dispatch(getProductsSuccess(success.data.data));
    }, 1000);

    return true;
  } catch (error) {
    setTimeout(() => {
      dispatch(loadingDone());
    }, 1000);
  }

  return false;
};

export const getCategoriesRequest = () => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/categories`;

  try {
    const success = await Axios.get(url);
    dispatch(getCategoriesSuccess(success.data.data));
  } catch (error) {
    // do nothing
  }
};

export const getDepartmentsRequest = () => async dispatch => {
  const url = `${process.env.REACT_APP_API_URL}/departments`;

  try {
    const success = await Axios.get(url);
    dispatch(getDepartmentsSuccess(success.data.data));
  } catch (error) {
    // do nothing
  }
};
