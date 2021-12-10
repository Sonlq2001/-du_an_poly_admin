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
export const getDetail = createAsyncThunk('product/detail', async (id) => {
  try {
    const response = await confirmProductApi.detailProduct(id);
    return response.data.data;
  } catch (error) {}
});
export const getListCampuses = createAsyncThunk(
  'product/campuses',
  async () => {
    try {
      const response = await confirmProductApi.getCampus();
      return response.data.campuses;
    } catch (error) {}
  }
);
export const productUser = createAsyncThunk(
  'product/productUser',
  async (user_id) => {
    try {
      const response = await confirmProductApi.productUser(user_id);
      return response.data;
    } catch (error) {}
  }
);
//  tìm kiếm
export const SearchProduct = createAsyncThunk(
  'product/searchProduct',
  async (data) => {
    try {
      const response = await confirmProductApi.seachProduct(data);
      console.log('response', response.data.data);
      return response.data.data;
    } catch (error) {
      console.log('response.data.data', error.response);
    }
  }
);
// filter
export const filterProduct = createAsyncThunk(
  'product/filterProduct',
  async (data) => {
    try {
      const response = await confirmProductApi.filter(data);
      return response.data.data;
    } catch (error) {}
  }
);
export const filterStatusProduct = createAsyncThunk(
  'product/filterProduct',
  async (id) => {
    try {
      const response = await confirmProductApi.filterStatus(id);
      return response.data.data;
    } catch (error) {}
  }
);
const initialState = {
  listProduct: [],
  isProductLoading: false,
  listProductType: [],
  loadingSeach :false,
  productDetail: {},
  loadingDetail: false,
  listCampuses: [],
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    // product user
    [productUser.pending]: (state) => {
      state.loadingSeach = true;
    },
    [productUser.fulfilled]: (state, action) => {
      state.loadingSeach = false;
      if (Array.isArray(action.payload)) {
        state.listProduct = action.payload.filter((item) => item.status !== 0);
      }
    },
    // get list product
    [getListProduct.pending]: (state) => {
      state.loadingSeach = true;
    },
    [getListProduct.fulfilled]: (state, action) => {
      state.loadingSeach = false;
      if (Array.isArray(action.payload.data)) {
        state.listProduct = action.payload.data.filter(
          (item) => item.status !== 0
        );
      }
    },
    [getListProduct.rejected]: (state) => {
      state.loadingSeach = false;
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
      state.listProductType = action.payload?.product_types;
    },
    [getProductType.rejected]: (state, action) => {},
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
    [getListCampuses.pending]: (state) => {},
    [getListCampuses.fulfilled]: (state, action) => {
      state.listCampuses = action.payload;
    },
    [getListCampuses.pending]: (state, action) => {},
    // search productt
    [SearchProduct.pending]: (state) => {
      state.loadingSeach = true
    },
    [SearchProduct.fulfilled]: (state, action) => {
      state.listProduct = action.payload;
      state.loadingSeach = false
    },
    [SearchProduct.fulfilled]: (state, action) => {
      state.listProduct = action.payload;
      state.loadingSeach = false
    },

    // filter
    [filterProduct.pending] : state =>{
      state.loadingSeach = true
    },
    [filterProduct.fulfilled]: (state, action) => {
      state.listProduct = action.payload;
      state.loadingSeach = false
    },
    [filterStatusProduct.rejected]: (state, action) => {
      state.listProduct = undefined;
      state.loadingSeach = false
    },
  },
});
const { reducer: productReducer } = productSlice;
export default productReducer;
