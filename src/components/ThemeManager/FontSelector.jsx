import React, { useState } from 'react';
import { Button } from '../Button';
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
        <Button
          $variant="secondary"
          onClick={() => setDropdownOpen((prev) => !prev)}
          style={{ fontFamily }}
        >
          {extractFontName(fontFamily)}
        </Button>
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
        <Button $variant="outline" onClick={() => onSizeChange(keyName, -1)}>
          -
        </Button>
        <span>{parseInt(fontSize) || '—'}</span>
        <Button $variant="outline" onClick={() => onSizeChange(keyName, 1)}>
          +
        </Button>
      </FontSizeWrapper>
    </FontRow>
  );
};

export default FontSelector;
