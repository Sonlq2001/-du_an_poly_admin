import api from 'api/api';
import { PRODUCT_PATH } from './../constants/confirm.paths';

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

export const confirmProductApi = {
  getListProduct,
  putStatusProduct,
  postProductApprove,
};
