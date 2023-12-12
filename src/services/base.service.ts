import axiosInstance from '@/utils/axios-instance.util';
import { Axios, AxiosRequestConfig } from 'axios';
import { join } from 'path';

type RequestConfig<T = any> = AxiosRequestConfig<T>;

export type PaginationMeta = {
  page: number;
  size: number;
  totalPage: number;
  total: number;
};

export type BaseResponse<T = any> = {
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
    return this.service.get<T, BaseResponse<T>>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.post<T, BaseResponse<T>>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.put<T, BaseResponse<T>>(url, data, config);
  }

  delete<T = any>(url: string, config?: RequestConfig<T>) {
    url = join(this.subUrl, url);
    return this.service.delete<T, BaseResponse<T>>(url, config);
  }
}
