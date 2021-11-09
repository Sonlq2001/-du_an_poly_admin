import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';

import { subjectApi } from './../api/subject.api.js';

export const getListSubject = createAsyncThunk(
  'subject/getListSubject',
  async (_, { rejectWithValue }) => {
    try {
      const response = await subjectApi.getListCategorySubject();
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const postSubject = createAsyncThunk(
  'subject/postSubject',
  async (newSubject, { rejectWithValue }) => {
    try {
      const response = await subjectApi.postCategorySubject(newSubject);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const removeSubject = createAsyncThunk(
  'subject/removeSubject',
  async (id, { rejectWithValue }) => {
    try {
      await subjectApi.removeCategorySubject(id);
      return id;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const putSubject = createAsyncThunk(
  'subject/update',
  async (subject, { rejectWithValue }) => {
    try {
      const response = await subjectApi.putCategorySubject(subject);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

const initialState = {
  listCategorySubject: [],
  isListSubjectLoading: false,
};
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  extraReducers: {
    // get list subject
    [getListSubject.pending]: (state) => {
      state.isListSubjectLoading = true;
    },
    [getListSubject.fulfilled]: (state, action) => {
      state.isListSubjectLoading = false;
      state.listCategorySubject = action.payload.data;
    },
    [getListSubject.rejected]: (state) => {
      state.isListSubjectLoading = false;
    },

    // post subject
    [postSubject.fulfilled]: (state, action) => {
      state.listCategorySubject = [
        ...state.listCategorySubject,
        action.payload.data,
      ];
    },
    [postSubject.rejected]: (state) => {
      state.isListSubjectLoading = false;
    },

    // remove subject
    [removeSubject.fulfilled]: (state, action) => {
      state.listCategorySubject = state.listCategorySubject.filter(
        (item) => item.id !== action.payload
      );
    },
    [removeSubject.rejected]: (state) => {
      state.isListSubjectLoading = false;
    },

    // put subject
    [putSubject.fulfilled]: (state, action) => {
      state.listCategorySubject = state.listCategorySubject.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
    },
    [putSubject.rejected]: (state) => {
      state.isListSubjectLoading = false;
    },
  },
});
const { reducer: Category_subjectReducer } = subjectSlice;
export default Category_subjectReducer;
