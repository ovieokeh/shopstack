import { IS_SEARCHING, STOP_SEARCHING } from '../actions/searchActions';

const initialState = {
  isSearching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_SEARCHING:
      return {
        ...state,
        isSearching: true,
      };

    case STOP_SEARCHING:
      return {
        ...state,
        isSearching: false,
      };

    default:
      return { ...state };
  }
};

export default reducer;
