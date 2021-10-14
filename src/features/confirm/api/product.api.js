import api from './../../../api/api';
import { PRODUCT_PATH } from './../constants/confirm.paths';
export const getAll = () => {
  return api.get(PRODUCT_PATH.LIST);
};
