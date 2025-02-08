import React from 'react';
import { ColorPickerWrapper } from './themeManagerStyles';

const ColorPicker = ({ colorKey, colorValue = '#000000', onChange }) => (
  <ColorPickerWrapper>
    <input
      type="color"
      id={colorKey}
      value={colorValue} // ✅ Toujours une valeur valide
      onChange={(e) => onChange(colorKey, e.target.value)}
    />
    <label htmlFor={colorKey}>{colorKey}</label>
  </ColorPickerWrapper>
);

export default ColorPicker;
