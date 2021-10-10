import { combineReducers } from '@reduxjs/toolkit';

import useReducer from './../features/user/redux/user.slice';
import { authReducer } from './../features/auth/redux/auth.slice';
import subjectReducer from './../features/subject/redux/subject.slice';
import uploadExcelReducer from './../features/uploadExcel/redux/uploadExcel.slice';
import { commonReducer } from './common.slice';

const rootReducer = combineReducers({
  user: useReducer,
  auth: authReducer,
  subject: subjectReducer,
  common: commonReducer,
  uploadExcel: uploadExcelReducer,
});

export default rootReducer;
