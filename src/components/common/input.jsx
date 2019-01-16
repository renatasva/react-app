import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
  return ( 
    <div className="form-group">
      <label htmlFor={name}>{ label }</label>
      <input 
        autoFocus
        value={value}
        onChange={onChange} 
        name={name}
        id={name} 
        type="text" 
        className="form-control"
      />
      {/* with && we check: if error is truthy - we'll get the error, otherwise it will be ignored */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
   );
}
 
export default Input;