import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';

import { dashboardApi } from './../api/dashboard.api';

export const getDataDashboard = createAsyncThunk(
  'dashboard/getDataDashboard',
  async (_params, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getDataDashboard();
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);
const initialState = {
  dataFeedbackNew: null,
  dataViewChart: null,
  totalProduct: null,
  total_users: null,
  totalComment: null,
  total_product_not_approved_yet: null,
  total_product_student_has_not_posted: null,
  isDataDashboardLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: {
    [getDataDashboard.pending]: (state) => {
      state.isDataDashboardLoading = true;
    },
    [getDataDashboard.fulfilled]: (state, action) => {
      state.isDataDashboardLoading = false;
      state.dataFeedbackNew = action.payload?.feedback;
      state.dataViewChart = action.payload?.data;
      state.totalProduct = action.payload?.total_products;
      state.totalComment = action.payload?.total_comments;
      state.total_users = action.payload?.total_users;
      state.total_product_student_has_not_posted = action.payload?.total_product_student_has_not_posted;
      state.total_product_not_approved_yet = action.payload?.total_product_not_approved_yet;
    },
    [getDataDashboard.rejected]: (state) => {
      state.isDataDashboardLoading = false;
    },
  },
});

const { reducer: dashboardReducer } = dashboardSlice;
export default dashboardReducer;
