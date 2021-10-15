import api from './../../../api/api';

import { AUTH_ENDPOINT } from './../constants/auth.endpoints';

const getLinkSocial = () => {
  return api.get(AUTH_ENDPOINT.GET_LINK_SOCIAL);
};

export const authApi = {
  getLinkSocial,
};
