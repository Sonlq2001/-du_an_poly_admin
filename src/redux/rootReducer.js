import { combineReducers } from '@reduxjs/toolkit';

import { commonReducer } from './common.slice';
import useReducer from './../features/user/redux/user.slice';
import { authReducer } from './../features/auth/redux/auth.slice';
import subjectReducer from './../features/subject/redux/subject.slice';
import uploadExcelReducer from './../features/uploadExcel/redux/uploadExcel.slice';
import majorsReducer from './../features/majors/redux/majors.slice';

const rootReducer = combineReducers({
  user: useReducer,
  auth: authReducer,
  subject: subjectReducer,
  common: commonReducer,
  uploadExcel: uploadExcelReducer,
  majors: majorsReducer,
});

export default rootReducer;
