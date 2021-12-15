import api from 'api/api';

import { DASHBOARD_ENDPOINTS } from './../constants/dashboard.endpoints';

const getDataDashboard = () => {
  return api.get(DASHBOARD_ENDPOINTS.GET_DATA_DASHBOARD);
};
export const dashboardApi = {
  getDataDashboard,
};
