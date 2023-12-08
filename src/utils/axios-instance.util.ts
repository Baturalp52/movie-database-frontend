import axios from 'axios';
import { standaloneToast } from './standalone-toast.util';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error.response?.status === 400) {
      standaloneToast({
        title: 'Error',
        description: error.response?.data?.errorMessage,
        status: 'error',
      });
    } else if (error.response?.status === 404) {
      standaloneToast({
        title: 'Not found!',
        description: error.response?.data?.errorMessage,
        status: 'error',
      });
    } else if (error.response?.status === 403) {
      standaloneToast({
        title: 'Forbidden!',
        status: 'error',
      });
    } else {
      standaloneToast({
        title: 'Error!',
        description: error?.response?.data?.errorMessage,
        status: 'error',
      });
    }

    return error?.response?.data;
  },
);

export default axiosInstance;
