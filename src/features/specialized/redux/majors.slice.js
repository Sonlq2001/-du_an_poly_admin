import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { majorsApi } from '../api/majors.api';

export const getMajors = createAsyncThunk('majors/getMajors', async () => {
  const response = await majorsApi.getMajors();
  return response.data;
});

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
      state.listMajors = action.payload;
    },
    [getMajors.rejected]: (state) => {
      state.listMajors = null;
    },
  },
});

const { reducer: majorsReducer } = majorsSlice;

export default majorsReducer;
