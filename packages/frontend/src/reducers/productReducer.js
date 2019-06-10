import {
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_REVIEWS_SUCCESS,
} from '../actions/productActions';

const initialState = {
  product: null,
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BEGIN:
      return {
        ...state,
        product: null,
        reviews: [],
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };

    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
