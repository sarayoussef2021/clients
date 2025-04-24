import React, { useState } from "react";
import { authService } from "../services/authService";
import PropTypes from "prop-types";
import "../assets/Form.css"; // Assure-toi que ce fichier existe

const SignupForm = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    setLoading(true);
    try {
      await authService.signup(fullName.trim(), email.trim(), phone.trim(), password);
      alert("Inscription réussie !");
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'inscription", err);
      setError("Erreur lors de l'inscription. Veuillez vérifier vos informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Inscription</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom complet *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Téléphone (facultatif)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignupForm;