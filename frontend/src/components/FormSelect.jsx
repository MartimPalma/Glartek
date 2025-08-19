import React from 'react';

const FormSelect = ({ label, value, onChange, options, name }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-select"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;