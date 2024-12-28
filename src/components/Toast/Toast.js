import React from 'react';
import './Toast.scss';

const Toast = ({ message, visible, onClose }) => {
  return (
    <div className={`toast ${visible ? 'visible' : ''}`}>
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast; 