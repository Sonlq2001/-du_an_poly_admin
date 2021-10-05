import { combineReducers } from '@reduxjs/toolkit';

import useReducer from './../features/user/redux/user.slice';
import { authReducer } from './../features/auth/redux/auth.slice';
import productReducer from '../features/product/redux/product.slice';

const rootReducer = combineReducers({
  user: useReducer,
  auth: authReducer,
  product: productReducer
});

export default rootReducer;
