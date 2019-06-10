import { NOTIFY_CLEAR, NOTIFY_ERROR, NOTIFY_SUCCESS } from '../actions/notificationActions';

const initialState = {
  message: '',
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case NOTIFY_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case NOTIFY_CLEAR:
      return {
        ...state,
        message: '',
        error: '',
      };

    default:
      return { ...state };
  }
};

export default reducer;
