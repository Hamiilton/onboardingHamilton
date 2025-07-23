import React from "react";
import "../styles/Modal.css";

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-message">¿Estás seguro que deseas cerrar sesión?</p>
        <div className="modal-buttons">
          <button className="modal-button" onClick={onConfirm}>
            Sí, cerrar sesión
          </button>
          <button className="modal-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
