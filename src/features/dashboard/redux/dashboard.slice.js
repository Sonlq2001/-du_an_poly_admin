import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import {dashboardApi}  from  "./../api/dashboard.api"

export const DataDashboard = createAsyncThunk('dashboard/getdata', async ()=>{
 
    try {
        const response = await dashboardApi.getData();
        return response.data
    } catch (error) {
        
    }
    
})
const initialState = {
    data : null,
    loading :  false
}
const DashboardSlice   = createSlice({
    name: "dashboard",
    initialState,
    extraReducers:{
        [DataDashboard.pending] :state =>{
            state.loading = true
        },
        [DataDashboard.fulfilled] :(state,action) =>{
            state.loading = false
            state.data = action.payload
            
        },
        [DataDashboard.pending] :state =>{
            state.loading = false
        },
    }
})
 const {reducer :  DashboardReducer}  = DashboardSlice
 export default  DashboardReducer