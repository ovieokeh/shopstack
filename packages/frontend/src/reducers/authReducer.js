import { AUTH_SUCCESS, AUTH_BEGIN, LOGOUT } from '../actions/authActions';
import { UPDATE_CUSTOMER_SUCCESS } from '../actions/profileActions';

let initialState;

try {
  const remember = localStorage.getItem('remember');
  /* istanbul ignore next */
  initialState =
    remember === 'true'
      ? JSON.parse(localStorage.getItem('store')).auth
      : (initialState = { customer: null, accessToken: null, loading: false });
} catch (error) {
  /* istanbul ignore next */
  initialState = { customer: null, accessToken: null, loading: false };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        ...state,
        accessToken: null,
        customer: null,
        loading: true,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        customer: action.payload.customer,
        loading: false,
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
      };

    case LOGOUT:
      window.localStorage.clear();

      return {
        ...state,
        accessToken: null,
        customer: null,
      };

    default:
      return { ...state };
  }
};

export default reducer;
