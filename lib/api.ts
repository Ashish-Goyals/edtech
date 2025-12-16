import axios, {AxiosInstance} from 'axios';

const api: AxiosInstance = axios.create ({
  withCredentials: true,
});

export default api;
