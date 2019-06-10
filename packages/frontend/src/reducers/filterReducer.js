import { SET_LIMIT, RESET_LIMIT } from '../actions/filterActions';

const initialState = {
  limit: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };

    case RESET_LIMIT:
      return {
        ...state,
        limit: initialState.limit,
      };

    default:
      return { ...state };
  }
};

export default reducer;
