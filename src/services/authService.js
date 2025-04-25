// services/authService.js
import axios from "axios";

const API_URL = "https://api-server-black.vercel.app/api/auth";

export const authService = {
  signup: async (fullName, email, phone, password) => {
    const response = await axios.post(`${API_URL}/signup`, {
      fullName,
      email,
      phone,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!localStorage.getItem("token"),
};
