import api from '../../../api/api';

import { ROLE_ENDPOINT } from '../constants/role.endpoints';

const getRole = () => {
  return api.get(ROLE_ENDPOINT.GET_SEMESTERS);
};

const postRole = (value) => {
  return api.post(ROLE_ENDPOINT.POST_SEMESTERS, value);
};

const removeRole = (id) => {
  return api.delete(
    ROLE_ENDPOINT.DELETE_SEMESTERS.replace(':id', id.toString())
  );
};

const putRole = (value) => {
  return api.put(
    ROLE_ENDPOINT.PUT_SEMESTERS.replace(':id', value.id.toString()),
    value
  );
};

export const roleApi = {
  getRole,
  postRole,
  removeRole,
  putRole,
};
