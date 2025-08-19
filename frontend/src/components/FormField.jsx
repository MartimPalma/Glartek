import React from 'react';

const FormField = ({ label, type = 'text', value, onChange, placeholder, required, name }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-control"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default FormField;