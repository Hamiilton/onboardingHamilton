import React from "react";
import "../styles/SuccessModal.css";

export default function SuccessModal({ message, onClose, buttonText = "Aceptar" }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <img src="/img/icons/exitoModal.png" alt="Éxito" />
        </div>
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
