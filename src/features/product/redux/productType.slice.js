import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const fetchData = createAsyncThunk('prodcut_type');
const initialState = {
  product_type: [],
};
const ProductTypeSlice = createSlice({
  name: 'product_type',
  initialState,
  extraReducers: {},
});
const { reducer: ProductTypeReducer } = ProductTypeSlice;
export default ProductTypeReducer;
