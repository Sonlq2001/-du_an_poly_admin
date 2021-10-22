import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { productTypeApi } from './../api/product-type.api';

export const getProductType = createAsyncThunk(
  'productType/getProductType',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productTypeApi.getProductTypes();
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const postProductType = createAsyncThunk(
  'productType/postProductType',
  async (value, { rejectWithValue }) => {
    try {
      const response = await productTypeApi.postProductTypes({
        product_type: value,
      });
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const putProductType = createAsyncThunk(
  'productType/putProductType',
  async (value, { rejectWithValue }) => {
    try {
      const response = await productTypeApi.putProductTypes({
        product_type: value,
      });
      return response.data;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

export const deleteProductType = createAsyncThunk(
  'productType/deleteProductType',
  async (id, { rejectWithValue }) => {
    try {
      productTypeApi.deleteProductTypes(id);
      return id;
    } catch (error) {
      const msgError = error.response.data.errors;
      return rejectWithValue(msgError);
    }
  }
);

const initialState = {
  listProductType: null,
};

const productTypeSlice = createSlice({
  name: 'product-type',
  initialState,
  extraReducers: {
    [getProductType.pending]: (state) => {
      state.listProductType = null;
    },
    [getProductType.fulfilled]: (state, action) => {
      state.listProductType = action.payload.product_types;
    },
    [getProductType.rejected]: (state) => {
      state.listProductType = null;
    },

    [postProductType.fulfilled]: (state, action) => {
      state.listProductType = [
        ...state.listProductType,
        action.payload.product_type,
      ];
    },
    [postProductType.rejected]: (state) => {
      state.listProductType = null;
    },
    [deleteProductType.fulfilled]: (state, action) => {
      state.listProductType = state.listProductType.filter(
        (item) => item.id !== action.payload
      );
    },
    [deleteProductType.rejected]: (state) => {
      state.listProductType = null;
    },
    [putProductType.fulfilled]: (state, action) => {
      state.listProductType = state.listProductType.map((item) =>
        item.id === action.payload.product_type.id
          ? action.payload.product_type
          : item
      );
    },
    [putProductType.rejected]: (state) => {
      state.listProductType = null;
    },
  },
});

const { reducer: productTypeReducer } = productTypeSlice;

export default productTypeReducer;
