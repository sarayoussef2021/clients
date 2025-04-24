import React, { useState, useEffect, useCallback, useMemo } from "react";
import { taskService } from "../services/api";
import "../assets/TaskList.css";
import { FaCheck, FaTimes } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [deletingTask, setDeletingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError("Erreur lors du chargement des tâches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }, [tasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
  };

  const handleUpdate = async (id) => {
    if (!newTitle.trim()) return;
    try {
      await taskService.updateTask(id, { title: newTitle });
      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, title: newTitle } : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error("Erreur de mise à jour", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      setDeletingTask(null);
    } catch (error) {
      console.error("Erreur de suppression", error);
    }
  };

  if (loading) return <p>Chargement des tâches...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <div key={task._id} className="task-item">
          <span>{task.title}</span>
          <div className="task-actions">
            <button onClick={() => handleEdit(task)}>Modifier</button>
            <button onClick={() => setDeletingTask(task)}>Supprimer</button>
          </div>
        </div>
      ))}

      {/* Modal édition */}
      {editingTask && (
        <div className="overlay">
          <div className="modal">
            <h2>Modifier la tâche</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate(editingTask._id);
              }}
              autoFocus
            />
            <button onClick={() => handleUpdate(editingTask._id)}>
              <FaCheck /> Valider
            </button>
            <button onClick={() => setEditingTask(null)}>
              <FaTimes /> Annuler
            </button>
          </div>
        </div>
      )}

      {/* Modal suppression */}
      {deletingTask && (
        <div className="overlay">
          <div className="modal">
            <h2>Confirmer la suppression ?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={() => handleDelete(deletingTask._id)}><FaCheck /> Oui</button>
              <button onClick={() => setDeletingTask(null)}><FaTimes /> Non</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
