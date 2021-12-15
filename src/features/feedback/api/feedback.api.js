import api from 'api/api';

import { FEEDBACK_ENDPOINTS } from './../constants/feedback.endpoints';

const getFeedback = (params) => {
  return api.get(FEEDBACK_ENDPOINTS.GET_FEEDBACK, { params });
};

const deleteFeedback = (id) => {
  return api.delete(FEEDBACK_ENDPOINTS.DELETE_FEEDBACK.replace(/:id/, id));
};

export const feedbackApi = {
  getFeedback,
  deleteFeedback,
};
