import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {

  if (!message) {
    return null;
  }

  return (
    <div className="alert alert-danger alert-dismissible fade show m-3 rounded-3 shadow-sm" role="alert">
      <div className="d-flex align-items-center gap-2">
        <AlertCircle size={20} />
        <strong className="me-1">Erro:</strong>
        {message}
      </div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default ErrorMessage;