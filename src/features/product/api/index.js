import api from './../../../api/api';
let url = '/products';
export const getAll = () => {
  return api.get(url);
};
