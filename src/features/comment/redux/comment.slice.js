import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';

import { commentApi } from '../api/comment.api';

export const getComment = createAsyncThunk(
  'comment/getComment',
  async (params, { rejectWithValue }) => {
    try {
      const response = await commentApi.getComment(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'error', ''));
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (id, { rejectWithValue }) => {
    try {
      await commentApi.deleteComment(id);
      return id;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

const initialState = {
  listComment: [],
  isListCommentLoading: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  extraReducers: {
    // list comment
    [getComment.pending]: (state) => {
      state.isListCommentLoading = true;
    },
    [getComment.fulfilled]: (state, action) => {
      state.isListCommentLoading = false;
      state.listComment = action.payload?.comments;
    },
    [getComment.rejected]: (state) => {
      state.isListCommentLoading = false;
    },

    // delete comment
    [deleteComment.fulfilled]: (state, action) => {
      state.isListCommentLoading = false;
      state.listComment = state.listComment.filter(
        (item) => item.id !== action.payload
      );
    },
    [deleteComment.rejected]: (state) => {
      state.isListCommentLoading = false;
    },
  },
});

const { reducer: commentReducer } = commentSlice;
export default commentReducer;
