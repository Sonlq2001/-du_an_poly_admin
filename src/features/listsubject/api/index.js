import api from './../../../api/api';

export const getAll = () => {
  const url = '/subjects?_limit=10';
  return api.get(url);
};
