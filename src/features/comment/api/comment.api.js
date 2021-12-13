import api from 'api/api';

import { COMMENT_ENDPOINTS } from './../constants/comment.endpoints';

const getComment = (params) => {
  return api.get(COMMENT_ENDPOINTS.GET_COMMENT, { params });
};

const deleteComment = (id) => {
  return api.delete(COMMENT_ENDPOINTS.DELETE_COMMENT_MAIN.replace(/:id/, id));
};

export const commentApi = {
  getComment,
  deleteComment,
};
