import React from "react";
import { InputProps } from "../../types";
import "./Input.css";

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  onChange,
  register = () => {},
  validation,
  name,
  error,
  label,
  disabled = false,
}) => {
  const inputClass = `input ${error ? "error-input" : ""}`;

  return label ? (
    <div className='container-label'>
      <label aria-labelledby={name} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        disabled={disabled}
        name={name}
        className={inputClass + "with-label"}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        {...register(name, validation)}
      />
      {error && <span className='error-message'>{`${error.message}`}</span>}
    </div>
  ) : (
    <input
      disabled={disabled}
      name={name}
      className={inputClass}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
