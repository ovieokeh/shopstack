import {
  GET_PRODUCTS_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_DEPARTMENTS_SUCCESS,
} from '../actions/shopActions';
import { GET_ORDERS_SUCCESS } from '../actions/orderActions';

let initialState;

try {
  /* istanbul ignore next */
  initialState = JSON.parse(localStorage.getItem('store')).shop;
} catch (error) {
  /* istanbul ignore next */
  initialState = {
    catalog: [],
    categories: [],
    departments: [],
    orders: [],
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        catalog: action.payload,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.payload,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
