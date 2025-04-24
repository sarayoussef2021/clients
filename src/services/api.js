// services/api.js
import axios from "axios";

// L'URL de ton backend (changer si nécessaire)
const API_URL = "https://api-server-jade-xi.vercel.app/api";

// Créer un client axios avec des en-têtes par défaut
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Si tu utilises un token d'authentification, ajoute un intercepteur
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Si une erreur se produit dans l'intercepteur
  }
);

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await apiClient.get("/tasks");
      return response.data; // Retourner les données des tâches
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);
      throw error; // Relancer l'erreur pour la gestion dans le composant
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await apiClient.post("/tasks", taskData);
      return response.data; // Retourner les données de la tâche créée
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
      throw error; // Relancer l'erreur pour la gestion dans le composant
    }
  },

  updateTask: async (id, updatedTask) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, updatedTask);
      return response.data; // Retourner les données de la tâche mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
      throw error; // Relancer l'erreur pour la gestion dans le composant
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data; // Retourner les données de la tâche supprimée
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
      throw error; // Relancer l'erreur pour la gestion dans le composant
    }
  },
};
