import React, { useState } from "react";
import { SelectProps } from "../../types";
import "./Select.css";

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className='select'>
      <select
        className='select__input'
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
