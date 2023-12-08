import axiosInstance from '@/utils/axios-instance.util';
import { Axios, AxiosRequestConfig } from 'axios';
import { join } from 'path';

type RequestConfig<T = any> = AxiosRequestConfig<T>;

type PaginationMeta = {
  page: number;
  size: number;
  totalPage: number;
  total: number;
};

type Response<T = any> = {
  success: boolean;
  data?: T | null;
  errorMessage?: string;
  meta?: PaginationMeta;
};

export default class BaseService {
  private service: Axios;
  private subUrl: string;
  constructor(subUrl = '') {
    this.service = axiosInstance;
    this.subUrl = subUrl;
  }

  get<T = any>(url: string, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.get<T, Response<T>>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.post<T, Response<T>>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.put<T, Response<T>>(url, data, config);
  }

  delete<T = any>(url: string, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.delete<T, Response<T>>(url, config);
  }
}
