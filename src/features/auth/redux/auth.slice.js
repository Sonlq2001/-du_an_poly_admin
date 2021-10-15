import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { authApi } from './../api/auth.api';

export const getLinkSocialLogin = createAsyncThunk(
  'auth/getLinkSocialLogin',
  async () => {
    await authApi.getLinkSocial();

  }
);

export const getToken = createAsyncThunk('auth/getToken', (token) => {
  return token;
});

const initialState = {
  accessToken: '',
  // linkSocial: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
  extraReducers: {
    // [getLinkSocialLogin.pending]: (state) => {
    //   state.linkSocial = null;
    // },
    // [getLinkSocialLogin.fulfilled]: (state, action) => {
    //   state.linkSocial = action.payload;
    // },
    // [getLinkSocialLogin.rejected]: (state) => {
    //   state.linkSocial = null;
    // },
    [getToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
