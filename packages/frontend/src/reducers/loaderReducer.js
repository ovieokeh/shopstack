import { LOADING_BEGIN, LOADING_DONE } from '../actions/loaderActions';

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case LOADING_DONE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return { ...state };
  }
};

export default reducer;
