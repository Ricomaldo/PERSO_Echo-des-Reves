import React, { useState } from 'react';
import {
  FontRow,
  FontDropdownWrapper,
  FontSizeWrapper,
} from './themeManagerStyles';
import { fonts } from '../../assets/data/fonts';

const FontSelector = ({
  keyName,
  label,
  fontFamily,
  fontSize,
  onFontChange,
  onSizeChange,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const extractFontName = (fullFontName) =>
    fullFontName?.split(',')[0] || 'Sans Nom';

  return (
    <FontRow>
      <span>{label}</span>
      <FontDropdownWrapper $isOpen={isDropdownOpen}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          style={{ fontFamily }}
        >
          {extractFontName(fontFamily)}
        </button>
        {isDropdownOpen && (
          <ul>
            {fonts.map((font) => (
              <li
                key={font.name}
                onClick={() => {
                  onFontChange(keyName, `${font.name}, sans-serif`);
                  setDropdownOpen(false);
                }}
                style={{ fontFamily: `${font.name}, sans-serif` }}
              >
                {font.name}
              </li>
            ))}
          </ul>
        )}
      </FontDropdownWrapper>
      <FontSizeWrapper>
        <button onClick={() => onSizeChange(keyName, -1)}>-</button>
        <span>{parseInt(fontSize) || '—'}</span>
        <button onClick={() => onSizeChange(keyName, 1)}>+</button>
      </FontSizeWrapper>
    </FontRow>
  );
};

export default FontSelector;
