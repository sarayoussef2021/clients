import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des tâches:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/tasks',
        { title, startDate, endDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTitle('');
      setStartDate('');
      setEndDate('');
      fetchTasks();
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la tâche:', err);
    }
  };

  return (
    <div>
      <h2>Tableau de bord</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Titre de la tâche" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} – du {new Date(task.startDate).toLocaleDateString()} au {new Date(task.endDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
