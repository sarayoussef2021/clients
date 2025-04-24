// services/userService.js
import axios from "axios";
import { authService } from "./authService";

const API_URL = "https://api-server-jade-xi.vercel.app/api/users";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get("/me");
    return response.data;
  },

  updateProfile: async (updates) => {
    const response = await apiClient.put("/me", updates);
    return response.data;
  },

  updatePassword: async (oldPassword, newPassword) => {
    const response = await apiClient.put("/me/password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  },
};
