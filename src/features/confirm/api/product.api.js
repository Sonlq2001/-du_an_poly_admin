import api from 'api/api';
import { PRODUCT_PATH } from './../constants/confirm.paths';

import { CONFIRM_ENDPOINTS } from './../constants/confirm.endpoints';

const putStatusProduct = (product) => {
  console.log('product', product);
};

const postProductApprove = (data) => {
  return api.post(
    CONFIRM_ENDPOINTS.POST_PRODUCT_APPROVE.replace(':id', data?.id),
    data
  );
};

const putProductChairmanApproved = (data) => {
  return api.put(
    CONFIRM_ENDPOINTS.PUT_PRODUCT_APPROVE.replace(':id', data?.id),
    data
  );
};

const deleteProduct = (id) => {
  return api.delete(CONFIRM_ENDPOINTS.DELETE_PRODUCT.replace(':id', id));
};

const detailProduct = (id) => {
  return api.get(PRODUCT_PATH.DETAIL.replace(':id', id.toString()));
};

const getProductUser = ({ user_id }) => {
  return api.get(CONFIRM_ENDPOINTS.GET_USER_PRODUCT.replace(':id', user_id));
};

const postSearchProduct = (data) => {
  return api.post(CONFIRM_ENDPOINTS.POST_FILTER_PRODUCT, data);
};

const postFilterCommonProduct = (data) => {
  return api.post(CONFIRM_ENDPOINTS.POST_FILTER_COMMON_PRODUCT, data);
};

const getFilterStatusProduct = (status) => {
  return api.get(
    CONFIRM_ENDPOINTS.GET_FILTER_STATUS_PRODUCT.replace(':status', status)
  );
};

export const confirmProductApi = {
  putStatusProduct,
  postProductApprove,
  deleteProduct,
  detailProduct,
  getProductUser,
  postSearchProduct,
  postFilterCommonProduct,
  getFilterStatusProduct,
  putProductChairmanApproved,
};
