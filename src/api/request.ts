import axios from 'axios';
import type { Method, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL:
    'https://service-38dtktyi-1257871791.gz.apigw.tencentcs.com/release/',
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    return error;
  }
);

export type Response<T = any> = T & {
  code: number;
};

export type MyResponse<T = any> = Promise<Response<T>>;
export const request = <T>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
