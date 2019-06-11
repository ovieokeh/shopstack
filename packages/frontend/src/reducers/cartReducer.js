import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cartActions';
import { SET_SHIPPING_COST } from '../actions/orderActions';

let initialState;

try {
  /* istanbul ignore next */
  initialState = JSON.parse(localStorage.getItem('store')).cart;
} catch (error) {
  /* istanbul ignore next */
  initialState = {
    id: null,
    items: [],
    count: 0,
    totalPrice: 0,
    subtotal: 0,
    shippingCost: 0,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_CART:
      return {
        ...state,
        ...action.payload,
      };

    case SET_SHIPPING_COST:
      return {
        ...state,
        shippingCost: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        ...action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        id: null,
        items: [],
        count: 0,
        totalPrice: 0,
        subtotal: 0,
        shippingCost: 0,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
