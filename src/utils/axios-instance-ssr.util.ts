import axios from 'axios';

const axiosInstanceSSR = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstanceSSR.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return error?.response?.data;
  },
);

export default axiosInstanceSSR;
