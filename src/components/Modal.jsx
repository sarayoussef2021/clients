import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-modal" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
