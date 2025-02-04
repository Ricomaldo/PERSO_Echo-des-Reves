import React from 'react';
import { ColorBox, ColorPickerWrapper } from './themeManagerStyles';

const ColorPicker = ({ label }) => {
  return (
    <ColorPickerWrapper>
      <ColorBox />
      <span>{label}</span>
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
