// services/taskService.js
import axios from "axios";
import { authService } from "./authService";

const API_URL = "https://api-server-jade-xi.vercel.app/api/tasks";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajout d'un intercepteur pour le token JWT
apiClient.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  getAllTasks: async () => {
    const response = await apiClient.get("/");
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await apiClient.post("/", taskData);
    return response.data;
  },

  updateTask: async (id, updatedTask) => {
    const response = await apiClient.put(`/${id}`, updatedTask);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },
};
