import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { majorsApi } from '../api/majors.api';

export const getMajors = createAsyncThunk(
  'majors/getMajors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await majorsApi.getMajors();
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const postMajors = createAsyncThunk(
  'majors/postMajors',
  async (majors, { rejectWithValue }) => {
    try {
      const response = await majorsApi.postMajors(majors);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const removeMajors = createAsyncThunk(
  'majors/removeMajors',
  async (id, { rejectWithValue }) => {
    try {
      await majorsApi.removeMajors(id);
      return id;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const putMajors = createAsyncThunk(
  'majors/putMajors',
  async (majors, { rejectWithValue }) => {
    try {
      const response = await majorsApi.putMajors(majors);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

const initialState = {
  listMajors: null,
};

const majorsSlice = createSlice({
  name: 'majors',
  initialState,

  extraReducers: {
    [getMajors.pending]: (state) => {
      state.listMajors = null;
    },
    [getMajors.fulfilled]: (state, action) => {
      state.listMajors = action.payload.data;
    },
    [getMajors.rejected]: (state) => {
      state.listMajors = null;
    },
    [postMajors.fulfilled]: (state, action) => {
      state.listMajors = [...state.listMajors, action.payload.data];
    },
    [postMajors.rejected]: (state) => {
      state.listMajors = null;
    },
    [removeMajors.fulfilled]: (state, action) => {
      state.listMajors = state.listMajors.filter(
        (item) => item.id !== action.payload
      );
    },
    [removeMajors.rejected]: (state) => {
      state.listMajors = null;
    },
    [putMajors.fulfilled]: (state, action) => {
      state.listMajors = state.listMajors.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
    },
    [putMajors.rejected]: (state) => {
      state.listMajors = null;
    },
  },
});

const { reducer: majorsReducer } = majorsSlice;

export default majorsReducer;
