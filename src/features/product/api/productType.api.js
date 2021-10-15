import api from './../../../api/api';
import { PRODUCTTYPE_ENDPOINT } from './../constants/productType.endpoints';
export const getProductType = () => {
  return api.get(PRODUCTTYPE_ENDPOINT.LIST);
};
export const postProductType = (data) => {
  return api.post(PRODUCTTYPE_ENDPOINT.POST, data);
};
export const updateProductType = (data) => {
  return api.put(
    PRODUCTTYPE_ENDPOINT.UPDATE.replace(':id', data.id.toString()),
    data
  );
};
export const removeProductType = (id) => {
  return api.delete(
    PRODUCTTYPE_ENDPOINT.REMOVE.replace(':id', data.id.toString())
  );
};
