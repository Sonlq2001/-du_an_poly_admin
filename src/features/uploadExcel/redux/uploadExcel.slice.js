import { createAsyncThunk } from '@reduxjs/toolkit';

import { uploadExcelApi } from './../api/upload-excel.api';

export const postImportFileExcel = createAsyncThunk(
  'uploadExcel/postImportFileExcel',
  async (file) => {
    const response = await uploadExcelApi.postImportFile(file);
  }
);
