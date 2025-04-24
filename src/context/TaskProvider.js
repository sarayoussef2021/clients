// TaskProvider.js
import React, { useReducer, createContext, useEffect, useState } from "react";
import { taskService } from "../services/api"; // Assure-toi d'importer le taskService

export const TaskContext = createContext();

const initialState = { tasks: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { tasks: action.payload };
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, title: action.payload.title } : task
        ),
      };
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isMounted, setIsMounted] = useState(true); // Pour vérifier si le composant est toujours monté

  useEffect(() => {
    const prefetchTasks = async () => {
      setLoading(true);
      setError(null); // Réinitialiser l'erreur avant de faire la requête
      try {
        const tasks = await taskService.getAllTasks(); // Utiliser taskService pour récupérer les tâches
        if (isMounted) {
          dispatch({ type: "SET_TASKS", payload: tasks }); // Mise à jour des tâches si le composant est monté
        }
      } catch (error) {
        if (isMounted) {
          setError("Erreur lors du chargement des tâches");
          console.error("Erreur lors du préchargement des tâches:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    prefetchTasks();

    // Cleanup function pour annuler l'effet si le composant est démonté
    return () => {
      setIsMounted(false); // Définir `isMounted` à false lors du démontage du composant
    };
  }, [isMounted]); // L'effet ne se déclenchera que si `isMounted` est vrai

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, dispatch, loading, error }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;