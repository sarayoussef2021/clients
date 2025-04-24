import React, { useState, useContext } from "react";
import { taskService } from "../services/api";
import { AuthContext } from "../context/AuthProvider";
import PropTypes from "prop-types";
import "../assets/TaskForm.css"; // Si tu as un fichier CSS associé

const TaskForm = ({ onTaskAdded }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Le titre ne peut pas être vide.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const newTask = await taskService.createTask({ title: title.trim() });
      setTitle("");
      if (onTaskAdded) onTaskAdded(newTask);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Échec de la création de la tâche.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated || !isAuthenticated()) return null;

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="task-input">Ajouter une tâche</label>
        <input
          id="task-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle tâche"
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Ajout en cours..." : "Ajouter"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};

export default TaskForm;