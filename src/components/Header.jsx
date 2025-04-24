import React, { useState } from 'react';
import UserMenu from './UserMenu';
import './Header.css';

const Header = ({ user, onLogout, onSettings }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">Mon Gestionnaire de Tâches</h1>
      <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
        <img
          src={user.photo || "https://via.placeholder.com/40"}
          alt="User"
          className="user-photo"
        />
        <span>{user.fullName}</span>
        {menuOpen && (
          <UserMenu onLogout={onLogout} onSettings={onSettings} />
        )}
      </div>
    </header>
  );
};

export default Header;
