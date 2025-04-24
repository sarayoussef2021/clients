// AuthProvider.js
import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // pour éviter les glitchs visuels avant chargement

  useEffect(() => {
    const fetchUser = async () => {
      const userData = authService.getUser(); // Récupère l'utilisateur actuel (probablement du localStorage ou d'un cookie)
      if (userData) {
        setUser(userData); // Si un utilisateur est trouvé, on met à jour l'état
      }
      setLoading(false); // Après avoir récupéré l'utilisateur, on passe en mode non chargé
    };

    fetchUser();
  }, []); // L'effet se lance une seule fois au montage du composant

  const logout = () => {
    authService.logout(); // Appeler le service de déconnexion
    setUser(null); // Réinitialiser l'état utilisateur après la déconnexion
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated(); // Vérifier si l'utilisateur est authentifié via authService
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
      {!loading ? children : <p>Chargement...</p>} {/* Afficher un loader tant que le chargement n'est pas terminé */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
