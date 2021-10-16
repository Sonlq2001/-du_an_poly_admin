import api from './../../../api/api';

import { AUTH_ENDPOINT } from './../constants/auth.endpoints';

const postAccessToken = (accessToken) => {
  return api.post(AUTH_ENDPOINT.POST_ACCESS_TOKEN, accessToken);
};

const postLogout = () => {
  return api.post(AUTH_ENDPOINT.POST_LOGOUT);
};

export const authApi = {
  postAccessToken,
  postLogout,
};
