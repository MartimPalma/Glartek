import React from 'react';

const LogsHeader = ({ cronName, onClose }) => (
    <div className="modal-header bg-primary text-white border-0 rounded-top-4">
        <h5 className="modal-title">Logs - {cronName}</h5>
        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
    </div>
);

export default LogsHeader;