import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _get from 'lodash.get';

import { authApi } from './../api/auth.api';

export const postAccessToken = createAsyncThunk(
  'auth/postAccessToken',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.postAccessToken({
        campus_code: data.codeCampus,
        access_token: data.accessToken,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const postLogout = createAsyncThunk('auth/postLogout', async () => {
  try {
    await authApi.postLogout();
    document.cookie = `access_token="";expires=0`;
    localStorage.clear();
  } catch (error) {}
});

const initialState = {
  accessToken: null,
  useLogin: null,
  permission: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
  extraReducers: {
    // login
    [postAccessToken.pending]: (state) => {
      state.accessToken = null;
    },
    [postAccessToken.fulfilled]: (state, action) => {
      const { email, avatar, id } = action.payload.user;
      state.accessToken = action?.payload.access_token;
      state.useLogin = { avatar, email, id };
    },

    // logout
    [postAccessToken.rejected]: (state) => {
      state.accessToken = null;
    },
    [postLogout.fulfilled]: (state) => {
      state.accessToken = null;
      state.useLogin = null;
      localStorage.clear();
      state.messenger = '';
    },
    [postLogout.rejected]: (state) => {
      state.accessToken = null;
      state.useLogin = null;
    },
  },
});

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'useLogin', 'permission'],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
