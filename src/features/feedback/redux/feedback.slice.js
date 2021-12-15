import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash.get';

import { feedbackApi } from './../api/feedback.api';

export const getFeedback = createAsyncThunk(
  'feedback/getFeedback',
  async (params, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.getFeedback(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id, { rejectWithValue }) => {
    try {
      await feedbackApi.deleteFeedback(id);
      return id;
    } catch (error) {
      return rejectWithValue(_get(error.response.data, 'errors', ''));
    }
  }
);

const initialState = {
  listFeedback: [],
  isListFeedbackLoading: false,
  total: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  extraReducers: {
    // list feedback
    [getFeedback.pending]: (state) => {
      state.isListFeedbackLoading = true;
    },
    [getFeedback.fulfilled]: (state, action) => {
      state.isListFeedbackLoading = false;
      state.listFeedback = action.payload?.data;
      state.total = action.payload?.total;
    },
    [getFeedback.rejected]: (state) => {
      state.isListFeedbackLoading = false;
    },

    // delete feedback
    [deleteFeedback.fulfilled]: (state, action) => {
      state.isListFeedbackLoading = false;
      state.listFeedback = state.listFeedback.filter(
        (item) => item.id !== action.payload
      );
    },
    [deleteFeedback.rejected]: (state) => {
      state.isListFeedbackLoading = false;
    },
  },
});

const { reducer: feedbackReducer } = feedbackSlice;
export default feedbackReducer;
