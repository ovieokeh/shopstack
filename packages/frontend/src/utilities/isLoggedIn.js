import store from '../store';

const isLoggedIn = () => !!store.getState().auth.accessToken;

export default isLoggedIn;
