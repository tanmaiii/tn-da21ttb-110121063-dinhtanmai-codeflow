import axios from 'axios';
import apiConfig from './api';
import queryString from 'query-string';
import tokenService from '@/services/token.service';

const API = apiConfig.baseUrl;

const createHttpClient = (path: string = '') => {
  const httpClient = axios.create({
    baseURL: `${API}/${path}`,
    timeout: 20000,
    paramsSerializer: params => queryString.stringify(params),
  });

  httpClient.interceptors.request.use(config => {
    const token = tokenService.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  httpClient.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      throw error.response?.data || error;
    },
  );

  return httpClient;
};

export default createHttpClient;
