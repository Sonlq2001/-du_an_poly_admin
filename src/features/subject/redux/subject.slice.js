import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, postSub, removeSub, updateSub } from './../api/subject.api.js';
export const fetchData = createAsyncThunk('subject/list', async () => {
  const { data } = await getAll();
  return data.data;
});
// thêm
export const postSubject = createAsyncThunk(
  'subject/create',
  async (newSubject) => {
    const { data } = await postSub(newSubject);
    return data;
  }
);
// xóa
export const removeSubject = createAsyncThunk('subject/remove', async (id) => {
  try {
    await removeSub(id);
    return id;
  } catch (error) {
    console.log('error', error);
  }
});
// cập nhật
export const updateSubject = createAsyncThunk(
  'subject/update',
  async (subject) => {
    const { data } = await updateSub(subject);
    return data;
  }
);
const initialState = {
  data: null,
};
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.data = null;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [fetchData.rejected]: (state) => {
      state.data = null;
    },
    // post
    [postSubject.fulfilled]: (state, action) => {
      state.data = [action.payload.data, ...state.data];
    },
    [postSubject.rejected]: (state) => {
      state.data = null;
    },
    // xóa
    [removeSubject.fulfilled]: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    [removeSubject.rejected]: (state) => {
      state.data = null;
    },
    // cập nhật
    [updateSubject.fulfilled]: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
    },
    [updateSubject.rejected]: (state) => {
      state.data = null;
    },
  },
});
const { reducer: subjectReducer } = subjectSlice;
export default subjectReducer;
