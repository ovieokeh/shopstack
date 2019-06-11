import {
  SET_CUSTOMER_DETAILS,
  CLEAR_CUSTOMER_DETAILS,
  SET_SHIPPING_ID,
} from '../actions/orderActions';

const initialState = {
  shippingId: null,
  customerDetails: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_DETAILS:
      return {
        ...state,
        customerDetails: action.payload,
      };

    case CLEAR_CUSTOMER_DETAILS:
      return {
        ...state,
        customerDetails: null,
      };

    case SET_SHIPPING_ID:
      return {
        ...state,
        shippingId: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
