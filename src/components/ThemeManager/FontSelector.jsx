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
  isAuthor,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const extractFontName = (fullFontName) => {
    const fontName = fullFontName?.split(',')[0] || 'Sans Nom';
    return fontName.replace(/^['"]|['"]$/g, '');
  };

  return (
    <FontRow>
      <span>{label}</span>
      <FontDropdownWrapper $isOpen={isDropdownOpen}>
        <Button
          $variant="secondary"
          onClick={() => setDropdownOpen((prev) => !prev)}
          style={{ fontFamily }}
          disabled={!isAuthor}
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
        <Button
          $variant="secondary"
          onClick={() => onSizeChange(keyName, -1)}
          disabled={!isAuthor}
        >
          -
        </Button>
        <span>{parseInt(fontSize) || '—'}</span>
        <Button
          $variant="secondary"
          onClick={() => onSizeChange(keyName, 1)}
          disabled={!isAuthor}
        >
          +
        </Button>
      </FontSizeWrapper>
    </FontRow>
  );
};

export default FontSelector;
