import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _get from 'lodash.get';

import { authApi } from './../api/auth.api';

export const postAccessToken = createAsyncThunk(
  'auth/postAccessToken',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.postAccessToken({
        campus_code: data.codeCampus,
        access_token: data.accessToken,
      });
      console.log("vô đây", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const postLogout = createAsyncThunk('auth/postLogout', async () => {
  try {
    await authApi.postLogout();
    document.cookie = `access_token="";expires=0`;
    localStorage.clear();
  } catch (error) {}
});

const initialState = {
  accessToken: null,
  userLogin: null,
  permission: [],
  listPermission: [],
  routerPermission: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getPermissions: (state, action) => {
      state.listPermission = action.payload;
    },
  },
  extraReducers: {
    // login
    [postAccessToken.pending]: (state) => {
      state.accessToken = null;
    },
    [postAccessToken.fulfilled]: (state, action) => {
      const { email, avatar, id, ministry_is, superadmin_is, teacher_is ,campus_id} =
      action.payload.user;
      state.accessToken = action?.payload.access_token;
      state.userLogin = {
        avatar,
        email,
        id,
        superAdmin: superadmin_is,
        ministry: ministry_is,
        teacher: teacher_is,
        campus_id : campus_id
      };
      const keys = [1, 2, 3, 4];
      let arrayPath = [];
      const listPermission = action.payload.user?.role;
      if (listPermission.length > 0) {
        const result = keys.map((key) => {
          const groupMenu = listPermission[0]?.permission.filter(
            (item) => item.status === key
          );

          const handleGroupMenu = groupMenu.map((item) => {
            arrayPath.push(...item?.view_permission);
            return {
              status: item?.status,
              items: item?.view_permission,
            };
          });

          return {
            title: handleGroupMenu[0]?.status,
            items: handleGroupMenu,
          };
        });
        state.permission = result;
        state.privateRouter = arrayPath;
      }
    },

    // logout
    [postAccessToken.rejected]: (state) => {
      state.accessToken = null;
    },
    [postLogout.fulfilled]: (state) => {
      state.accessToken = null;
      state.userLogin = null;
      state.permission = [];
      state.privateRouter = [];
    },
    [postLogout.rejected]: (state) => {
      state.accessToken = null;
      state.userLogin = null;
    },
  },
});

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'userLogin', 'permission', 'privateRouter'],
};

export const { getPermissions } = authSlice.actions;

export const authReducer = persistReducer(authConfig, authSlice.reducer);
