import api from 'api/api';
import {
  PRODUCT_PATH,
  PRODUCT_TYPE,
  CHAIRMAN_APPROVE_PATH,
} from './../constants/confirm.paths';

const getListProduct = () => {
  return api.get(PRODUCT_PATH.LIST);
};

const putStatusProduct = (product) => {
  console.log('product', product);
};
const postProductApprove = (data) => {
  if (data.status === 2) {
    return api.post(
      PRODUCT_PATH.APPROVE.replace(':id', data.id.toString()),
      data
    );
  } else if (data.status === 3) {
    return api.put(
      CHAIRMAN_APPROVE_PATH.CHAIRMAN_APPROVE.replace(':id', data.id.toString()),
      data
    );
  }
};
const productRemove = (id) => {
  return api.delete(PRODUCT_PATH.REMOVE.replace(':id', id.toString()));
};
const productTypes = () => {
  return api.get(PRODUCT_TYPE.LIST);
};
const detailProduct = (id) => {
  return api.get(PRODUCT_PATH.DETAIL.replace(':id', id.toString()));
};
export const confirmProductApi = {
  getListProduct,
  putStatusProduct,
  postProductApprove,
  productRemove,
  productTypes,
  detailProduct,
};
