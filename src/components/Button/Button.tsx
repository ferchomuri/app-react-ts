import React from "react";
import { ButtonProps } from "../../types";
import "./Button.css";

const Button: React.FC<ButtonProps> = ({
  text,
  size = "small-button",
  color = "primary-button",
  type = "button",
  disabled = false,
  onClick = () => {},
}) => {
  const buttonClass = `button ${size} ${color}`;
  const dataTestId = `${size} ${color} ${type}`;

  return (
    <button
      data-testid={dataTestId}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
