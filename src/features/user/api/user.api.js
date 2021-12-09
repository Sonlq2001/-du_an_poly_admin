import api from 'api/api';

import { USER_ENDPOINTS } from './../constants/user.endpoints';

const getUsers = (params) => {
  return api.get(USER_ENDPOINTS.GET_USERS, { params });
};

const postUser = (data) => {
  return api.post(USER_ENDPOINTS.POST_USER, data);
};
const putUser = (value) => {
  return api.put(USER_ENDPOINTS.PUT_USER.replace(':id', value.id), value);
};

const getUserDetail = (id) => {
  return api.get(USER_ENDPOINTS.GET_USERS_DETAIL.replace(':id', id));
};

const deleteUser = (id) => {
  return api.delete(USER_ENDPOINTS.DELETE_USER.replace(':id', id));
};

export const userApi = {
  getUsers,
  putUser,
  getUserDetail,
  postUser,
  deleteUser,
};
