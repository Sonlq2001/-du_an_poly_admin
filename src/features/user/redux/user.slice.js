import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from './../../../api/api';

export const fetchData = createAsyncThunk('user/fetchData', async () => {
  const response = await api.get('/products');
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
