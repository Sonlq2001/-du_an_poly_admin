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
  async (product, { rejectWithValue }) => {
    try {
      await confirmProductApi.postProductApprove(product);
      return product;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);
export const removeProduct = createAsyncThunk(
  'product/remove',
  async (id, { rejectWithValue }) => {
    try {
      const response = await confirmProductApi.productRemove(id);
      return response.data.info.id;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);
export const getProductType = createAsyncThunk(
  'product/productType',
  async () => {
    try {
      const response = await confirmProductApi.productTypes();
      return response.data;
    } catch (e) {}
  }
);
const initialState = {
  listProduct: [],
  isProductLoading: false,
  listProductType: [],
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

    [approveProduct.fulfilled]: (state, action) => {
      state.listProduct = state.listProduct.map((item) => {
        if (item.id === action.payload.id) item.status = action.payload.status;
        return item;
      });
      state.isProductLoading = false;
    },
    [approveProduct.rejected]: (state) => {
      state.isProductLoading = false;
    },

    [removeProduct.fulfilled]: (state, action) => {
      state.listProduct = state.listProduct.filter(
        (item) => item.id !== action.payload
      );
    },
    [getProductType.fulfilled]: (state, action) => {
      state.listProductType = action.payload.product_types;
    },
    [getProductType.rejected]: (state, action) => {},
  },
});
export const { productUpdate } = productSlice.actions;
const { reducer: productReducer } = productSlice;
export default productReducer;
