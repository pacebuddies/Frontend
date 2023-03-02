import axios, { AxiosInstance } from 'axios';

export const ApiAddress = process.env['NEXT_PUBLIC_API_GATEWAY_ADDRESS'];

const stravaApi: AxiosInstance = axios.create({
  baseURL: `${ApiAddress}/api/v1/bridge`,
  withCredentials: true,
});
export default stravaApi;
