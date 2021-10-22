import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, update } from './../api/product.api';
export const ListProduct = createAsyncThunk('product/list', async () => {
  const { data } = await getAll();
  return data;
});
export const updateProduct = createAsyncThunk(
  'product/update',
  async (product) => {
    const response = await update(product);
    console.log('redux', response);
  }
);
const initialState = {
  listProduct: null,
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productUpdate(state, action) {
      state.listProduct = state.listProduct.map((item) => {
        if (item.id === action.payload) item.status = 1;
        return item;
      });
    },
  },
  extraReducers: {
    [ListProduct.pending]: (state) => {
      state.listProduct = null;
    },
    [ListProduct.fulfilled]: (state, action) => {
      state.listProduct = action.payload.data;
    },
    [ListProduct.pending]: (state) => {
      state.listProduct = null;
    },
  },
});
export const { productUpdate } = productSlice.actions;
const { reducer: productReducer } = productSlice;
export default productReducer;
