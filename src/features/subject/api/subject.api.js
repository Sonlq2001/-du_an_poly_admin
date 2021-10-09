import api from './../../../api/api';
let url = '/subjects';
export const getAll = () => {
  return api.get(url);
};
