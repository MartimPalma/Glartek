import React from 'react';

const FormTextArea = ({ label, value, onChange, placeholder, rows, name }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-control"
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

export default FormTextArea;