import api from 'api/api';

import { PRODUCT_TYPE_ENDPOINTS } from '../constants/product-type.endpoints';

const getProductTypes = (params) => {
  return api.get(PRODUCT_TYPE_ENDPOINTS.GET_PRODUCT_TYPE, { params });
};

const postProductTypes = (value) => {
  return api.post(PRODUCT_TYPE_ENDPOINTS.POST_PRODUCT_TYPE, value);
};

const putProductTypes = (value) => {
  return api.put(
    PRODUCT_TYPE_ENDPOINTS.PUT_PRODUCT_TYPE.replace(
      ':id',
      value.product_type.id
    ),
    value
  );
};

const deleteProductTypes = (id) => {
  return api.delete(
    PRODUCT_TYPE_ENDPOINTS.DELETE_PRODUCT_TYPE.replace(':id', id.toString())
  );
};

export const productTypeApi = {
  getProductTypes,
  postProductTypes,
  putProductTypes,
  deleteProductTypes,
};
