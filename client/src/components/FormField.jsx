import React from 'react';
import './formfield.css';

const FormField = ({ name, value, type, handleChange, label, placeholder, err, pattern, req }) => {
  return (
    <div className='formfield'>
        <label>{label}</label>
        <input name={name} type={type} pattern={pattern} placeholder={placeholder} value={value} onChange={handleChange} required={req}/>
        <span>{err}</span>
    </div>
  )
}

export default FormField