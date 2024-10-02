import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

export default instance;
