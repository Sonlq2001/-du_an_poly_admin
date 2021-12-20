import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';
import { userApi } from './../api/user.api';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);
export const postUsers = createAsyncThunk(
  'user/post',
  async (user, { rejectWithValue }) => {
    try {
      const response = await userApi.postUser(user);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);
export const putUsers = createAsyncThunk(
  'user/putUsers',
  async (value, { rejectWithValue }) => {
    try {
      const response = await userApi.putUser(value);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const getUserDetail = createAsyncThunk(
  'user/getUserDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserDetail(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await userApi.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

const initialState = {
  // users
  listUser: [],
  isListUserLoading: false,

  // user
  itemUser: null,
  isItemUserLoading: false,
  total: null,
};

const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // get list user
    [getUsers.pending]: (state) => {
      state.isListUserLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isListUserLoading = false;
      state.listUser = action.payload?.users;
      state.total = action.payload?.total;
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

    // add user
    [postUsers.fulfilled]: (state, action) => {
      if (action.payload.name) {
        state.listUser = [...state.listUser, action.payload];
      }
    },
    [postUsers.rejected]: (state) => {
      state.isItemUserLoading = false;
    },

    // remove user
    [deleteUser.fulfilled]: (state, action) => {
      state.isItemUserLoading = false;
      state.listUser = state.listUser.filter(
        (item) => item.id !== action.payload
      );
    },
    [deleteUser.rejected]: (state) => {
      state.isItemUserLoading = false;
    },
  },
});

const { reducer: useReducer } = useSlice;
export default useReducer;
