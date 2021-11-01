import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';

import { confirmProductApi } from './../api/product.api';

export const getListProduct = createAsyncThunk(
  'confirm/getListProduct',
  async (_, { rejectWithValue }) => {
    try {
      const response = await confirmProductApi.getListProduct();
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const approveProduct = createAsyncThunk(
  'product/update',
  async (product) => {
    try {
      const response = await confirmProductApi.postProductApprove(product);
      if (response) {
        return response.data;
      }
    } catch (error) {}
  }
);

const initialState = {
  listProduct: [],
  isProductLoading: false,
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
    // get list product
    [getListProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [getListProduct.fulfilled]: (state, action) => {
      state.isProductLoading = false;
      state.listProduct = action.payload.data;
    },
    [getListProduct.rejected]: (state) => {
      state.isProductLoading = false;
    },

    [approveProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [approveProduct.fulfilled]: (state, action) => {
      state.isProductLoading = false;
      state.listProduct = state.listProduct.map((item) => {
        if (item.id === action.payload.id) item.status = action.payload.status;
        return item;
      });
    },
    [approveProduct.rejected]: (state) => {
      state.isProductLoading = false;
    },
  },
});
export const { productUpdate } = productSlice.actions;
const { reducer: productReducer } = productSlice;
export default productReducer;
