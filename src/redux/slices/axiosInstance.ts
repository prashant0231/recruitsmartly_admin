import { config } from "@/constants/config";
import axios from "axios";
import { store } from "../store";

const isRefreshing = false;
const failedQueue: any[] = [];

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Attach Token
axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const auth_token = state.auth.token;

    if (auth_token) {
      config.headers.Authorization = `Bearer ${auth_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Expired Token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log(
      "Axios Error:",
      error.response?.status,
      typeof error.response?.status
    );

    if (error.response?.status === 400) {
      console.log("Token Expired - Refreshing Token...");

      // Mark as retry to prevent infinite loops
      originalRequest._retry = true;

      if (isRefreshing) {
        console.log("Waiting for refresh to complete...");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
