import axios from 'axios';

const requestInterceptor = (req) => {
  const { accessToken } = JSON.parse(localStorage.getItem('persist:auth'));
  const token = accessToken.replace(/"/g, '');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
};

const responseInterceptor = (res) => {
  return res;
};

const errorInterceptor = (axiosError) => {
  if (axiosError && axiosError.response) {
    const statusCode = axiosError.response?.status;
    if (statusCode === 403) {
      window.location = '/';
    }
    if (statusCode === 401) {
      if (axiosError.response.data.message === 'Unauthenticated.') {
        Storage.clear();
        window.location.reload();
      }
    }
  }
  return Promise.reject(axiosError);
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
