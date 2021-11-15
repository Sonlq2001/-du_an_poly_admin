import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _get from 'lodash.get';

import { authApi } from './../api/auth.api';

export const postAccessToken = createAsyncThunk(
  'auth/postAccessToken',
  async (accessToken) => {
    try {
      const response = await authApi.postAccessToken({
        access_token: accessToken,
      });
      return response.data;
    } catch (error) {}
  }
);

export const postLogout = createAsyncThunk('auth/postLogout', async () => {
  try {
    await authApi.postLogout();
    localStorage.clear();
  } catch (error) {}
});

export const getCampuses = createAsyncThunk(
  'auth/getCampuses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getCampus();
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

const initialState = {
  accessToken: null,
  useLogin: null,

  listCampus: [],
  isListCampusLoading: false,
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
      if (
        action.payload.hasOwnProperty('access_token') &&
        action.payload.hasOwnProperty('user')
      ) {
        const { email, avatar, id } = action?.payload.user;
        state.accessToken = action?.payload.access_token;
        state.useLogin = { avatar, email, id };
      }
    },

    // logout
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

    // list campuses
    [getCampuses.pending]: (state) => {
      state.isListCampusLoading = true;
    },
    [getCampuses.fulfilled]: (state, action) => {
      state.isListCampusLoading = false;
      state.listCampus = action.payload.campuses;
    },
    [getCampuses.rejected]: (state) => {
      state.isListCampusLoading = false;
    },
  },
});

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'useLogin'],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
