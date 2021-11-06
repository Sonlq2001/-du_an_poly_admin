import api from 'api/api';
import { PRODUCT_PATH, PRODUCT_TYPE } from './../constants/confirm.paths';

const getListProduct = () => {
  return api.get(PRODUCT_PATH.LIST);
};

const putStatusProduct = (product) => {
  console.log('produc', product);
};
const postProductApprove = (data) => {
  return api.post(
    PRODUCT_PATH.APPROVE.replace(':id', data.id.toString()),
    data
  );
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
