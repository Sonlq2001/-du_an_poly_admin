import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { permissionsApi } from '../api/permissions.api';

export const getPermissions = createAsyncThunk(
  'permissions/getPermissions',
  async (_, { rejectWithValue }) => {
    
    try {
      const response = await permissionsApi.getPer();
      return response.data.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const postPermissions = createAsyncThunk(
  'permissions/postPermissions',
  async (value, { rejectWithValue }) => {
    try {
      const response = await permissionsApi.postPermissions(value);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const removePermissions = createAsyncThunk(
  'permissions/removePermissions',
  async (id, { rejectWithValue }) => {
    try {
      await permissionsApi.removePermissions(id);
      return id;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const putPermissions = createAsyncThunk(
  'permissions/putPermissions',
  async (value, { rejectWithValue }) => {
    try {
      const response = await permissionsApi.putPermissions(value);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

const initialState = {
  listPermissions: [],
  loadingPermissions : false
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,

  extraReducers: {
    [getPermissions.pending]: (state) => {
      state.loadingPermissions = true;
    },
    [getPermissions.fulfilled]: (state, action) => {
      state.listPermissions = action.payload;
      state.loadingPermissions = false;
    },
    [getPermissions.rejected]: (state) => {
      state.listPermissions = [];
      state.loadingPermissions = false;
    },
    [postPermissions.fulfilled]: (state, action) => {
      state.listPermissions = [...state.listPermissions, action.payload];
    },
    [postPermissions.rejected]: (state) => {
      state.listPermissions = null;
    },
    [removePermissions.fulfilled]: (state, action) => {
      state.listPermissions = state.listPermissions.filter(
        (item) => item.id !== action.payload
      );
    },
    [removePermissions.rejected]: (state) => {
      state.listPermissions = null;
    },
    [putPermissions.fulfilled]: (state, action) => {
      state.listPermissions = state.listPermissions.map((item) =>
        item.id === action.payload[0].id ? action.payload[0] : item
      );
    },
    [putPermissions.rejected]: (state) => {
      state.listPermissions = null;
    },
  },
});

const { reducer: permissionsReducer } = permissionsSlice;

export default permissionsReducer;
