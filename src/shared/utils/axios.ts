import axios from "axios";
import type { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3001"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => request);

export default axiosInstance;
