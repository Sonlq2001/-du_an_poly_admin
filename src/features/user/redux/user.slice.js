import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from './../../../api/api';
import { USER_PATH } from './../constants/user.paths';

export const fetchData = createAsyncThunk('user/fetchData', async () => {
  const response = await api.get(USER_PATH.GET_USER);
  return response.data;
});

const initialState = {
  data: [],
  loading: false,
};

const useSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state) => {
      state.loading = true;
    },
  },
});

const { reducer: useReducer } = useSlice;

export default useReducer;
