import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { semesterApi } from '../api/semester.api';

export const getSemester = createAsyncThunk(
  'semester/getSemester',
  async (_, { rejectWithValue }) => {
    try {
      const response = await semesterApi.getSemester();
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const postSemester = createAsyncThunk(
  'semester/postSemester',
  async (value, { rejectWithValue }) => {
    try {
      const response = await semesterApi.postSemester(value);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const removeSemester = createAsyncThunk(
  'semester/removeSemester',
  async (id, { rejectWithValue }) => {
    try {
      await semesterApi.removeSemester(id);
      return id;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const putSemester = createAsyncThunk(
  'semester/putSemester',
  async (value, { rejectWithValue }) => {
    try {
      const response = await semesterApi.putSemester(value);
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

const initialState = {
  listSemester: null,
};

const semesterSlice = createSlice({
  name: 'semester',
  initialState,

  extraReducers: {
    [getSemester.pending]: (state) => {
      state.listSemester = null;
    },
    [getSemester.fulfilled]: (state, action) => {
      state.listSemester = action.payload.semesters;
    },
    [getSemester.rejected]: (state) => {
      state.listSemester = null;
    },
    [postSemester.fulfilled]: (state, action) => {
      state.listSemester = [...state.listSemester, action.payload];
    },
    [postSemester.rejected]: (state) => {
      state.listSemester = null;
    },
    [removeSemester.fulfilled]: (state, action) => {
      state.listSemester = state.listSemester.filter(
        (item) => item.id !== action.payload
      );
    },
    [removeSemester.rejected]: (state) => {
      state.listSemester = null;
    },
    [putSemester.fulfilled]: (state, action) => {
      state.listSemester = state.listSemester.map((item) =>
        item.id === action.payload[0].id ? action.payload[0] : item
      );
    },
    [putSemester.rejected]: (state) => {
      state.listSemester = null;
    },
  },
});

const { reducer: semesterReducer } = semesterSlice;

export default semesterReducer;
