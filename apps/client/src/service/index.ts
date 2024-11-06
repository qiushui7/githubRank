import axios from 'axios';
import { getCookie } from '../utils/useAuthStore';

const service = axios.create({
  baseURL: '/service',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getCookie('user_info');
    const userInfo = token ? JSON.parse(token) : null;
    if (userInfo) {
      config.headers['Authorization'] = `${userInfo.login}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response;
    if (res.status !== 200) {
      return Promise.reject(new Error(res.statusText || 'Error'));
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
