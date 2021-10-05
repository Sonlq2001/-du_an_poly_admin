import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll } from './../api/index';
export const ListProduct = createAsyncThunk('product/list', async () => {
  const { data } = await getAll();
  return data;
});
const initialState = {
  product: [],
  loading: false,
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [ListProduct.pending]: (state) => {
      state.loading = true;
    },
    [ListProduct.fulfilled]: (state, action) => {
      state.product = action.payload.data;
      state.loading = false;
    },
    [ListProduct.pending]: (state) => {
      state.loading = true;
    },
  },
});
const { reducer: productReducer } = productSlice;
export default productReducer;
