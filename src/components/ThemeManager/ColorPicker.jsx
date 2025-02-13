import React from 'react';
import { ColorPickerWrapper } from './themeManagerStyles';

const ColorPicker = ({
  colorKey,
  colorValue = '#000000',
  onChange,
  label,
  isAuthor,
}) => {
  return (
    <ColorPickerWrapper>
      <input
        type="color"
        id={colorKey}
        value={colorValue}
        disabled={!isAuthor} // 🔥 Désactive le ColorPicker si l'utilisateur n'est pas l'auteur
        onChange={(e) => onChange(colorKey, e.target.value)}
      />
      <label htmlFor={colorKey}>{label}</label>{' '}
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
