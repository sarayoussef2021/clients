import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import './App.css'; // Assure-toi que le CSS est bien importé

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // Contrôle de la popup de connexion
  const [showSignup, setShowSignup] = useState(false); // Contrôle de la popup d'inscription

  const closeModal = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div className="app-container">
      <div className="welcome-message">
        <h1>Bienvenue sur votre application de gestion de tâches !</h1>
        <div className="button-container">
          <button onClick={() => setShowLogin(true)}>Se connecter</button>
          <button onClick={() => setShowSignup(true)}>S'inscrire</button>
        </div>
      </div>

      {/* Overlay pour modal */}
      {(showLogin || showSignup) && <div className="overlay" onClick={closeModal}></div>}

      {/* Affichage de la popup de Login */}
      {showLogin && <LoginForm onClose={closeModal} />}

      {/* Affichage de la popup d'Inscription */}
      {showSignup && <SignupForm onClose={closeModal} />}
    </div>
  );
};

export default App;