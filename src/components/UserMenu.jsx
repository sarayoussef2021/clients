import React from 'react';
import './UserMenu.css';

const UserMenu = ({ onLogout, onSettings }) => {
  return (
    <div className="user-menu">
      <button onClick={onSettings}>Paramètres</button>
      <button onClick={onLogout}>Déconnexion</button>
    </div>
  );
};

export default UserMenu;
