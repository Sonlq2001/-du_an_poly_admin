import { combineReducers } from '@reduxjs/toolkit';

import useReducer from './../features/user/redux/user.slice';
import { authReducer } from './../features/auth/redux/auth.slice';

const rootReducer = combineReducers({
  user: useReducer,
  auth: authReducer,
});

export default rootReducer;
