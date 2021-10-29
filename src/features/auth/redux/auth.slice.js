import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { authApi } from './../api/auth.api';

export const postAccessToken = createAsyncThunk(
  'auth/postAccessToken',
  async (accessToken) => {
    try {
      const response = await authApi.postAccessToken({
        access_token: accessToken,
      });
      console.log('auth', response);
      return response.data;
    } catch (error) {
      console.log('errors ', error);
    }
  }
);

export const postLogout = createAsyncThunk('auth/postLogout', async () => {
  try {
    await authApi.postLogout();
    localStorage.clear();
  } catch (error) {}
});

const initialState = {
  accessToken: null,
  useLogin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
  extraReducers: {
    [postAccessToken.pending]: (state) => {
      state.accessToken = null;
    },
    [postAccessToken.fulfilled]: (state, action) => {
      const { email, avatar, id } = action.payload.user;
      state.accessToken = action.payload.access_token;
      state.useLogin = { avatar, email, id };
    },
    [postAccessToken.rejected]: (state) => {
      state.accessToken = null;
    },
    [postLogout.fulfilled]: (state) => {
      state.accessToken = null;
      state.useLogin = null;
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
  whitelist: ['accessToken', 'useLogin'],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
