import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cartActions';

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
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        ...action.payload,
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
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
