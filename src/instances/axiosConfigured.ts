import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
const stravaApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    Authorization: 'AUTH TOKEN FROM INSTANCE (interceptor is not working)',
  },
});

/*
 Setting token for every request
 */
stravaApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const session = await getSession();
  config.headers!['Authorization'] = 'Bearer ' + session?.accessToken;
  return config;
});
export default stravaApi;
