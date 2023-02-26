import axios, { AxiosInstance} from 'axios';
const stravaApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    Authorization: 'AUTH TOKEN FROM INSTANCE (interceptor is not working)',
  },
  withCredentials: true,
});
export default stravaApi;
