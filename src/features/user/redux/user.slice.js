import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from './../api/user.api';

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  try {
    const response = await userApi.getUsers();
    return response.data;
  } catch (error) {}
});

export const putUsers = createAsyncThunk('user/putUsers', async (value) => {
  try {
    const response = await userApi.putUser(value);
    return response.data;
  } catch (error) {}
});

export const getUserDetail = createAsyncThunk(
  'user/getUserDetail',
  async (id) => {
    try {
      const response = await userApi.getUserDetail(id);
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  // users
  listUser: [],
  isListUserLoading: false,

  // user
  itemUser: null,
  isItemUserLoading: false,
};

const useSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    // get list user
    [getUsers.pending]: (state) => {
      state.isListUserLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isListUserLoading = false;
      state.listUser = action.payload.users;
    },
    [getUsers.rejected]: (state) => {
      state.isListUserLoading = false;
    },

    // get user detail
    [getUserDetail.pending]: (state) => {
      state.isItemUserLoading = true;
    },
    [getUserDetail.fulfilled]: (state, action) => {
      state.isItemUserLoading = false;
      state.itemUser = action.payload.user;
    },
    [getUserDetail.rejected]: (state) => {
      state.isItemUserLoading = false;
    },
  },
});

const { reducer: useReducer } = useSlice;

export default useReducer;
