import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputWrapper } from './inputStyles';
import StarRating from './StarRating'; // Importe le composant StarRating

const CustomInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputWrapper>
      <label htmlFor={id}>{label} :</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === 'date' ? (
        <DatePicker
          selected={value}
          onChange={onChange}
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
        />
      ) : type === 'stars' ? (
        <StarRating value={value} onChange={onChange} />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </InputWrapper>
  );
};

export default CustomInput;
