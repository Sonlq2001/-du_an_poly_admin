import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export const getToken = createAsyncThunk('auth/getToken', (token) => {
  return token;
});

const initialState = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
  extraReducers: {
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
