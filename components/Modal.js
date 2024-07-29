import React from 'react';
import styles from "@/styles/Modal.module.css"

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;