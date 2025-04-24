import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import '../assets/ProfilePage.css';

const ProfilePage = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');
  const [logoutAfterPasswordChange, setLogoutAfterPasswordChange] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',
        newPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await authService.updateProfile(formData);
      setMessage("Profil mis à jour avec succès");

      if (formData.newPassword) {
        // Déconnexion après changement de mot de passe
        setLogoutAfterPasswordChange(true);
        setTimeout(() => {
          authService.logout();
          onLogout(); // callback pour retourner à la page login
        }, 2000);
      }
    } catch (err) {
      setMessage("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.photo || 'https://via.placeholder.com/100'}
          alt="Profil"
          className="profile-image"
        />
        <h2>{user.fullName}</h2>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Nom complet</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Mot de passe actuel</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Nouveau mot de passe</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <button type="submit">Mettre à jour</button>
      </form>

      <button className="logout-btn" onClick={() => { authService.logout(); onLogout(); }}>
        Déconnexion
      </button>

      {message && <p className="profile-message">{message}</p>}
      {logoutAfterPasswordChange && <p className="profile-message">Déconnexion après mise à jour...</p>}
    </div>
  );
};

export default ProfilePage;
