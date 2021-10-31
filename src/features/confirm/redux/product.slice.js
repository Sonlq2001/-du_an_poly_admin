import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, products_Approve } from './../api/product.api';
export const ListProduct = createAsyncThunk('product/list', async () => {
  const { data } = await getAll();
  return data;
});
export const ApproveProduct = createAsyncThunk(
  'product/update',
  async (product) => {
    try {
      const response = await products_Approve(product);
      if (response) {
        return product;
      }
    } catch (error) {}
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
        if (item.id === action.payload.id) item.status = action.payload.status;
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
    [ListProduct.rejected]: (state) => {
      state.listProduct = null;
    },
    [ApproveProduct.fulfilled]: (state, action) => {
      state.listProduct = state.listProduct.map((item) => {
        if (item.id === action.payload.id) item.status = action.payload.status;
        return item;
      });
    },
    [ApproveProduct.rejected]: (state) => {
      state.listProduct = null;
    },
  },
});
export const { productUpdate } = productSlice.actions;
const { reducer: productReducer } = productSlice;
export default productReducer;
