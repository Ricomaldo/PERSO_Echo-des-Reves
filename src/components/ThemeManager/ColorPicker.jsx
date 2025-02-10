import React from 'react';
import { ColorPickerWrapper } from './themeManagerStyles';

const ColorPicker = ({ colorKey, colorValue = '#000000', onChange, label }) => (
  <ColorPickerWrapper>
    <input
      type="color"
      id={colorKey}
      value={colorValue}
      onChange={(e) => onChange(colorKey, e.target.value)}
    />
    <label htmlFor={colorKey}>{label}</label>{' '}
    {/* 🔥 Affiche un label lisible */}
  </ColorPickerWrapper>
);

export default ColorPicker;
