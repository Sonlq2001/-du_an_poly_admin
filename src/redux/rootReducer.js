import { combineReducers } from '@reduxjs/toolkit';

import useReducer from './../features/user/redux/user.slice';
import { authReducer } from './../features/auth/redux/auth.slice';
import subjectReducer from '../features/listsubject/redux/subject.slice';

const rootReducer = combineReducers({
  user: useReducer,
  auth: authReducer,
  subject: subjectReducer,
});

export default rootReducer;
