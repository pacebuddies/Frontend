import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

export const ApiAddress = process.env['NEXT_PUBLIC_API_GATEWAY_ADDRESS'];

const stravaApi: AxiosInstance = axios.create({
  baseURL: `${ApiAddress}/api/v1/`,
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
