import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { uploadExcelApi } from './../api/upload-excel.api';

export const postImportFileExcel = createAsyncThunk(
  'uploadExcel/postImportFileExcel',
  async (file) => {
    await uploadExcelApi.postImportFile(file);
  }
);

export const getSemesters = createAsyncThunk(
  'uploadExcel/getSemesters',
  async () => {
    const response = await uploadExcelApi.getSemesters();
    return response.data;
  }
);

const initialState = {
  listSemester: null,
};

const uploadExcelSlice = createSlice({
  name: 'upload-excel',
  initialState,
  extraReducers: {
    [getSemesters.pending]: (state) => {
      state.listSemester = null;
    },
    [getSemesters.fulfilled]: (state, action) => {
      state.listSemester = action.payload.semesters;
    },
    [getSemesters.rejected]: (state) => {
      state.listSemester = null;
    },
  },
});

const { reducer: uploadExcelReducer } = uploadExcelSlice;

export default uploadExcelReducer;
