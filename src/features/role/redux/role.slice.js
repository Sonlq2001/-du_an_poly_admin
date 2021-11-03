import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { roleApi } from '../api/role.api';

export const getRole = createAsyncThunk(
  'role/getRole',
  async (_, { rejectWithValue }) => {
  
    try {
      const response = await roleApi.getRole();
      console.log("response.data",response)
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const postRole = createAsyncThunk(
  'role/postRole',
  async (value, { rejectWithValue }) => {
    try {
      const response = await roleApi.postRole(value);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const removeRoles = createAsyncThunk(
  'role/removeRole',
  async (id, { rejectWithValue }) => {
    try {
      await roleApi.removeRole(id);
      return id;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const putRole = createAsyncThunk(
  'role/putRole',
  async (value, { rejectWithValue }) => {
    try {
      const response = await roleApi.putRole(value);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

const initialState = {
  listRole: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,

  extraReducers: {
    [getRole.pending]: (state) => {
      state.listRole = null;
    },
    [getRole.fulfilled]: (state, action) => {
      state.listRole = action.payload.roles;
    },
    [getRole.rejected]: (state) => {
      state.listRole = [];
    },
    [postRole.fulfilled]: (state, action) => {
      state.listRole = [...state.listRole, action.payload];
    },
    [postRole.rejected]: (state) => {
      state.listRole = null;
    },
    [removeRoles.fulfilled]: (state, action) => {
      state.listRole = state.listRole.filter(
        (item) => item.id !== action.payload
      );
    },
    [removeRoles.rejected]: (state) => {
      state.listRole = null;
    },
    [putRole.fulfilled]: (state, action) => {
      state.listRole = state.listRole.map((item) =>
        item.id === action.payload[0].id ? action.payload[0] : item
      );
    },
    [putRole.rejected]: (state) => {
      state.listRole = null;
    },
  },
});

const { reducer: roleReducer } = roleSlice;

export default roleReducer;
