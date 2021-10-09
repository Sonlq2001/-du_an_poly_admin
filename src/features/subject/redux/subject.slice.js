import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll } from './../api/subject.api.js';
export const fetchData = createAsyncThunk('subject/list', async () => {
  const { data } = await getAll();
  return data.data;
});
const initialState = {
  data: [],
  loading: false,
};
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state) => {
      state.loading = true;
    },
  },
});
const { reducer: subjectReducer } = subjectSlice;
export default subjectReducer;
