// src/api/axios.js
import axios from "axios";
import {AUTH_URL} from "../config";

const axiosAUTHApi = axios.create({
  baseURL: AUTH_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {"Content-Type": "application/json",
  },
});


axiosAUTHApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // e.g. redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosAUTHApi;