import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import loaderReducer from './loaderReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import searchReducer from './searchReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  loader: loaderReducer,
  shop: shopReducer,
  selectedProduct: productReducer,
  cart: cartReducer,
  search: searchReducer,
  filters: filterReducer,
});
