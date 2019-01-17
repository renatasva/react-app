import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return ( 
    <div className="form-group">
      <label htmlFor={name}>{ label }</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {/* with && we check: if error is truthy - we'll get the error, otherwise it will be ignored */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
   );
}
 
export default Input;


//this is original version of Input component: In updated version we use ...rest operator to get the other properties from the props object
// const Input = ({ type, name, label, value, error, onChange }) => {
//   return ( 
//     <div className="form-group">
//       <label htmlFor={name}>{ label }</label>
//       <input 

//         value={value}
//         onChange={onChange} 
//         name={name}
//         id={name} 
//         type={type} 
//         className="form-control"
//       />
//       {/* with && we check: if error is truthy - we'll get the error, otherwise it will be ignored */}
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//    );
// }