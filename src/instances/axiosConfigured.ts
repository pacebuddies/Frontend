import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

export const ApiAddress = process.env['NEXT_PUBLIC_API_GATEWAY_ADDRESS'];

const pacbuddiesApi: AxiosInstance = axios.create({
  baseURL: `${ApiAddress}/api/v1/`,
  headers: {
    Authorization: 'AUTH TOKEN FROM INSTANCE (interceptor is not working)',
  },
});

export const stravaOauthApi: AxiosInstance = axios.create({
  baseURL: `https://www.strava.com/oauth`,
  headers: {
    Authorization: 'AUTH TOKEN FROM INSTANCE (interceptor is not working)',
  },
})

/*
 Setting token for every request
 */
pacbuddiesApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const session = await getSession();
  config.headers!['Authorization'] = 'Bearer ' + session?.accessToken;
  return config;
});

stravaOauthApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const session = await getSession();
  config.headers!['Authorization'] = 'Bearer ' + session?.accessToken;
  return config;
});

export default pacbuddiesApi;