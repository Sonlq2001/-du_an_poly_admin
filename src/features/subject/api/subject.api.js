import api from './../../../api/api';

import { SUBJECT_PATH } from './../constants/subject.paths';
export const getAll = () => {
  return api.get(SUBJECT_PATH.LIST);
};
export const postSub = (data) => {
  return api.post(SUBJECT_PATH.POST, data);
};
export const removeSub = (id) => {
  return api.delete(SUBJECT_PATH.REMOVE.replace(':id', id.toString()));
};
export const updateSub = (data) => {
  return api.put(SUBJECT_PATH.UPDATE.replace(':id', data.id.toString()),data);
};
