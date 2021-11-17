import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { authApi } from './../api/auth.api';

export const postAccessToken = createAsyncThunk(
  'auth/postAccessToken',
  async (accessToken) => {
    try {
      const response = await authApi.postAccessToken(accessToken);
      return response.data;
    } catch (error) {
      return error.response.data.errors;
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
export const getCampus = createAsyncThunk('auth/getCampuses', async () => {
  try {
    const response = await authApi.getCampuses();
    return response.data.campuses;
  } catch (error) {}
});

const initialState = {
  accessToken: null,
  useLogin: null,
  listCampuses: [],
  messenger: null,
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
      if (action.payload.user) {
        const { email, avatar, id } = action.payload.user;
        state.accessToken = action?.payload.access_token;
        state.useLogin = { avatar, email, id };
      } else {
        state.messenger = action.payload;
      }

      // }
    },
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
    [getCampus.fulfilled]: (state, action) => {
      state.listCampuses = action.payload;
    },
    [getCampus.rejected]: (state, action) => {
      state.listCampuses = action.payload;
    },
  },
});

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'useLogin'],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
