import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';

import { confirmProductApi } from './../api/product.api';

export const postProductApprove = createAsyncThunk(
  'product/postProductApprove',
  async (data, { rejectWithValue }) => {
    try {
      await confirmProductApi.postProductApprove(data);
      return data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const putProductChairmanApproved = createAsyncThunk(
  'product/putProductChairmanApproved',
  async (data, { rejectWithValue }) => {
    try {
      await confirmProductApi.putProductChairmanApproved(data);
      return data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await confirmProductApi.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const getDetail = createAsyncThunk('product/detail', async (id) => {
  try {
    const response = await confirmProductApi.detailProduct(id);
    return response.data.data;
  } catch (error) {}
});

export const getProductUser = createAsyncThunk(
  'product/productUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await confirmProductApi.getProductUser(userId);
      console.log("vô đây ",response.data)
      console.log("userId ",userId)
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const postSearchProduct = createAsyncThunk(
  'product/postSearchProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await confirmProductApi.postSearchProduct(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const postFilterCommonProduct = createAsyncThunk(
  'product/postFilterCommonProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await confirmProductApi.postFilterCommonProduct(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const getFilterStatusProduct = createAsyncThunk(
  'product/getFilterStatusProduct',
  async (status, { rejectWithValue }) => {
    try {
      const response = await confirmProductApi.getFilterStatusProduct(status);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

const initialState = {
  listProductUser: [],
  isListProductUser: false,

  productDetail: {},
  loadingDetail: false,
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    // product user
    [getProductUser.pending]: (state) => {
      state.isListProductUser = true;
    },
    [getProductUser.fulfilled]: (state, action) => {
      state.isListProductUser = false;
      state.listProductUser = action.payload;
    },
    [getProductUser.rejected]: (state) => {
      state.isListProductUser = false;
    },

    // teacher update
    [postProductApprove.fulfilled]: (state, action) => {
      state.listProductUser = state.listProductUser.map((item) =>
        item.id === action.payload?.id
          ? { ...item, status: action.payload?.status }
          : item
      );
      state.isListProductUser = false;
    },
    [postProductApprove.rejected]: (state) => {
      state.isListProductUser = false;
    },

    // chairman approved update
    [putProductChairmanApproved.fulfilled]: (state, action) => {
      state.listProductUser = state.listProductUser.map((item) =>
        item.id === action.payload?.id
          ? { ...item, status: action.payload?.status }
          : item
      );
      state.isListProductUser = false;
    },
    [putProductChairmanApproved.rejected]: (state) => {
      state.isListProductUser = false;
    },

    [deleteProduct.fulfilled]: (state, action) => {
      state.isListProductUser = false;
      state.listProductUser = state.listProductUser.filter(
        (item) => item.id !== action.payload
      );
    },
    [deleteProduct.rejected]: (state) => {
      state.isListProductUser = false;
    },

    // chi tiết sản Phẩm
    [getDetail.pending]: (state) => {
      state.loadingDetail = false;
    },
    [getDetail.fulfilled]: (state, action) => {
      state.productDetail = action.payload;
      state.loadingDetail = true;
    },
    [getDetail.rejected]: (state) => {
      state.loadingDetail = true;
    },

    // search product
    [postSearchProduct.fulfilled]: (state, action) => {
      state.listProductUser = action.payload;
      state.isListProductUser = false;
    },
    [postSearchProduct.rejected]: (state) => {
      state.isListProductUser = false;
    },

    // filter common
    [postFilterCommonProduct.fulfilled]: (state, action) => {
      state.isListProductUser = false;
      state.listProductUser = action.payload;
    },
    [postFilterCommonProduct.rejected]: (state) => {
      state.isListProductUser = false;
    },

    // filter status product
    [getFilterStatusProduct.fulfilled]: (state, action) => {
      state.isListProductUser = false;
      state.listProductUser = action.payload;
    },
    [getFilterStatusProduct.rejected]: (state) => {
      state.isListProductUser = false;
    },
  },
});
const { reducer: productReducer } = productSlice;
export default productReducer;
