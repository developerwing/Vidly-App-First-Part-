import React from 'react';

const Input = (props) =>{
    const { value , onChange , label, name , errors ,type} = props;
    return (
        <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input 
            value = {value}
            onChange = {onChange}
            type="text"
            name ={ name }
            id={name}
            className="form-control"
            type = {type}
            />
       { errors && <div className="alert alert-danger">{errors}</div> }
        </div>
        
    );
}

export default Input;