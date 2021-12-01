import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateProductApi } from "../api/productDetail.api";

export const getData = createAsyncThunk("productDetail/getdata",  async(id)=>{
    try {
        const response = await UpdateProductApi.getData(id)
        // console.log("ở đây", response.data.data)
        return response.data.data
    } catch (error) {
        
    }
   
})
const initialState = {
    data : null,
    loading :false
}
const productDetailSlice = createSlice({
    name : "productDetail",
    initialState,
    extraReducers : {
            [getData.pending] : state =>{
                state.loading = true
            },
            [getData.fulfilled] : (state,action) =>{
                state.data = action.payload
                state.loading = false
            },
            [getData.pending] : state =>{
                state.loading = false
            },
    }
})
const {reducer :  productDetailReducer} = productDetailSlice
export default  productDetailReducer