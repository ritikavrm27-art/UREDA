// src/api/axios.js
import axios from "axios";
import BASE_URL from "../config";

const axiosApi = axios.create({
  baseURL: BASE_URL, 
  timeout: 10000,
  withCredentials: true,
  headers: {"Content-Type": "application/json",
  },
});


axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // e.g. redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosApi;