import api from '../../../api/api';

import { MAJORS_ENDPOINTS } from '../constants/majors.endpoints';

const getMajors = () => {
  return api.get(MAJORS_ENDPOINTS.GET_MAJORS);
};

export const majorsApi = {
  getMajors,
};
