import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
//   baseURL: 'https://your-api-base-url.com', // 根据你的 API 地址修改
  baseURL: 'http://127.0.0.1:8000/api/v1/', // 根据你的 API 地址修改
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里可以添加一些通用的请求逻辑，例如添加 token 等
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在这里可以处理一些通用的响应逻辑，例如处理错误码等
    console.log('response:', response)
    return response.data;
  },
  (error) => {
    console.log('error:', error)
    // 处理响应错误，例如 token 过期等
    if (error.response && error.response.status === 401) {
      // 例如可以进行 token 刷新或跳转到登录页面
    }
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = <T>(url: string, params?: any): Promise<T> => {
  return instance.get(url, { params }).then((response) => response as T);
};

// 封装 POST 请求
export const post = <T>(url: string, data?: any): Promise<T> => {
  return instance.post(url, data).then((response) => response as T);
};

// 封装 PUT 请求
export const put = <T>(url: string, data?: any): Promise<T> => {
  return instance.put(url, data).then((response) => response as T);
};

// 封装 DELETE 请求
export const deleteRequest = <T>(url: string): Promise<T> => {
  return instance.delete(url).then((response) => response as T);
};

export default {
  get,
  post,
  put,
  deleteRequest
}