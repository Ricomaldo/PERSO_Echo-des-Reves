import React, { useState } from 'react';
import {
  ColorPickersWrapper,
  FontDropdown,
  FontSizeWrapper,
} from './themeManagerStyles';

const ThemeManager = () => {
  const [selectedFont, setSelectedFont] = useState('Pacifico');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fontSizes, setFontSizes] = useState({
    h1: 24,
    h2: 20,
    h3: 18,
    body: 16,
  });

  const fontOptions = [
    { label: 'Pacifico', value: "'Pacifico', sans-serif" },
    { label: 'Caveat', value: "'Caveat', sans-serif" },
    { label: 'Inter', value: "'Inter', sans-serif" },
    { label: 'Orbitron', value: "'Orbitron', sans-serif" },
    { label: 'Roboto', value: "'Roboto', sans-serif" },
    { label: 'Lora', value: "'Lora', serif" },
    { label: 'Oswald', value: "'Oswald', sans-serif" },
    { label: 'Poppins', value: "'Poppins', sans-serif" },
    { label: 'Raleway', value: "'Raleway', sans-serif" },
    { label: 'Merriweather', value: "'Merriweather', serif" },
    { label: 'Quicksand', value: "'Quicksand', sans-serif" },
    { label: 'Playfair Display', value: "'Playfair Display', serif" },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const adjustFontSize = (key, increment) => {
    setFontSizes((prev) => ({
      ...prev,
      [key]: Math.max(8, prev[key] + increment), // Min 8px
    }));
  };

  return (
    <div>
      {/* Color Pickers */}
      <ColorPickersWrapper>
        {[
          'primary',
          'secondary',
          'accent',
          'background',
          'surface',
          'text',
        ].map((colorKey) => (
          <div key={colorKey}>
            <label htmlFor={colorKey}>{colorKey}</label>
            <input type="color" id={colorKey} />
          </div>
        ))}
      </ColorPickersWrapper>

      {/* Font Dropdown */}
      <FontDropdown $isOpen={isDropdownOpen}>
        <button onClick={toggleDropdown}>
          {`Police actuelle : ${selectedFont}`}
        </button>
        <ul>
          {fontOptions.map((font) => (
            <li
              key={font.value}
              style={{ fontFamily: font.value }}
              onClick={() => {
                setSelectedFont(font.label);
                setIsDropdownOpen(false); // Fermer le menu après sélection
              }}
            >
              {font.label}
            </li>
          ))}
        </ul>
      </FontDropdown>

      {/* Font Size Adjustment */}
      {['h1', 'h2', 'h3', 'body'].map((key) => (
        <FontSizeWrapper key={key}>
          <label>{`Taille de ${key.toUpperCase()}`}</label>
          <div className="font-size-buttons">
            <button onClick={() => adjustFontSize(key, -1)}>-</button>
            <span>{`${fontSizes[key]}px`}</span>
            <button onClick={() => adjustFontSize(key, 1)}>+</button>
          </div>
        </FontSizeWrapper>
      ))}
    </div>
  );
};

export default ThemeManager;
