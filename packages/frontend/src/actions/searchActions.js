import Axios from 'axios';
import dotenv from 'dotenv';
import { loadingBegin, loadingDone } from './loaderActions';
import { getProductsSuccess } from './shopActions';

dotenv.config();

export const IS_SEARCHING = 'IS_SEARCHING';
export const STOP_SEARCHING = 'STOP_SEARCHING';

const isSearching = () => ({ type: IS_SEARCHING });

export const stopSearching = () => dispatch => {
  dispatch({ type: STOP_SEARCHING });
};

export const searchRequest = params => async dispatch => {
  const { searchQuery, allWords, page, limit, descriptionLength } = params;
  const url = `${
    process.env.REACT_APP_API_URL
  }/products/search?queryString=${searchQuery}&allWords=${allWords}&page=${page}&limit=${limit}&descriptionLength=${descriptionLength}`;

  dispatch(loadingBegin());
  dispatch(isSearching());

  const searchResults = await Axios.get(url);
  const products = searchResults.data.data;
  products.products = products.results;
  delete products.results;

  dispatch(getProductsSuccess(products));
  dispatch(loadingDone());
};
