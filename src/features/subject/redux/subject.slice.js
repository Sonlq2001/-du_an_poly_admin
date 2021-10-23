import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { subjectApi } from './../api/subject.api.js';

export const getListSubject = createAsyncThunk(
  'subject/getListSubject',
  async (_, { rejectWithValue }) => {
    try {
      const response = await subjectApi.getListSubject();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSubject = createAsyncThunk(
  'subject/postSubject',
  async (newSubject, { rejectWithValue }) => {
    try {
      const response = await subjectApi.postSubject(newSubject);
      return response.data;
    } catch (error) {
      const { code, majorId } = error.response.data.errors;
      const arrayError = [...code, ...majorId];
      return rejectWithValue(arrayError);
    }
  }
);

export const removeSubject = createAsyncThunk(
  'subject/removeSubject',
  async (id, { rejectWithValue }) => {
    try {
      await subjectApi.removeSubject(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const putSubject = createAsyncThunk(
  'subject/update',
  async (subject, { rejectWithValue }) => {
    try {
      const response = await subjectApi.putSubject(subject);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const initialState = {
  listSubject: null,
};
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  extraReducers: {
    [getListSubject.pending]: (state) => {
      state.listSubject = null;
    },
    [getListSubject.fulfilled]: (state, action) => {
      state.listSubject = action.payload.data;
    },
    [getListSubject.rejected]: (state) => {
      state.listSubject = null;
    },
    [postSubject.fulfilled]: (state, action) => {
      state.listSubject = [...state.listSubject, action.payload.data];
    },
    [postSubject.rejected]: (state) => {
      state.listSubject = null;
    },
    [removeSubject.fulfilled]: (state, action) => {
      state.listSubject = state.listSubject.filter(
        (item) => item.id !== action.payload
      );
    },
    [removeSubject.rejected]: (state) => {
      state.listSubject = null;
    },

    [putSubject.fulfilled]: (state, action) => {
      state.listSubject = state.listSubject.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
    },
    [putSubject.rejected]: (state) => {
      state.data = null;
    },
  },
});
const { reducer: subjectReducer } = subjectSlice;
export default subjectReducer;
