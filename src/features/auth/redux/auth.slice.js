import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
	accessToken: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducer: {},
});

const authConfig = {
	key: "auth",
	storage,
	whitelist: ["accessToken"],
};

export const authReducer = persistReducer(authConfig, authSlice.reducer);
