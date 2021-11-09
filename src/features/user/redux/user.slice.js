import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getApiUser } from './../api/user.api';
export const getListUser = createAsyncThunk('user/fetchData', async () => {
  try {
    const response = await getApiUser.getUser();
    return response.data.users;
  } catch (error) {}
});

const initialState = {
  listUser: [],
  loading: false,
};

const useSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getListUser.pending]: (state) => {
      state.loading = true;
    },
    [getListUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.listUser = action.payload;
    },
    [getListUser.rejected]: (state) => {
      state.loading = true;
    },
  },
});

const { reducer: useReducer } = useSlice;

export default useReducer;
