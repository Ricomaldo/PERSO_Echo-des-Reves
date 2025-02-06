import React, { useState, useEffect } from 'react';
import { useTheme } from '../../utils/contexts/ThemeProvider';

import { Button, ButtonGroup } from '../../components/Button';

import {
  ColorPickersWrapper,
  FontDropdownWrapper,
  FontSizeWrapper,
  FontRow,
} from './themeManagerStyles';

const ThemeManager = () => {
  const { theme: currentTheme, updatePreferences } = useTheme(); // ✅ Suppression de `isThemeReady`
  const [currentThemeDraft, setCurrentThemeDraft] = useState(
    currentTheme || {}
  );
  const [openDropdown, setOpenDropdown] = useState(null); // ✅ Ajout de `useState`

  useEffect(() => {
    if (currentTheme) {
      setCurrentThemeDraft(currentTheme);
    }
  }, [currentTheme]);

  if (!currentThemeDraft || !currentThemeDraft.colors) {
    return <p>Chargement du thème...</p>; // ✅ Sécurisation de l'affichage
  }

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

  const adjustFontSize = (key, increment) => {
    setCurrentThemeDraft((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [`fontSize${key.toUpperCase()}`]: `${
          parseInt(prev.typography[`fontSize${key.toUpperCase()}`]) + increment
        }px`, // ✅ Correction
      },
    }));
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key)); // ✅ Gestion du dropdown
  };

  return (
    <div>
      {/* Sélecteurs de couleurs */}
      <ColorPickersWrapper>
        {Object.keys(currentThemeDraft.colors).map((colorKey) => (
          <div key={colorKey}>
            <label htmlFor={colorKey}>{colorKey}</label>
            <input
              type="color"
              id={colorKey}
              value={currentThemeDraft.colors[colorKey]}
              onChange={(e) =>
                setCurrentThemeDraft((prev) => ({
                  ...prev,
                  colors: { ...prev.colors, [colorKey]: e.target.value },
                }))
              }
            />
          </div>
        ))}
      </ColorPickersWrapper>

      {/* Sélecteurs de typographie */}
      {['h1', 'h2', 'h3', 'body'].map((key) => (
        <FontRow key={key}>
          <span
            style={{
              fontFamily:
                currentThemeDraft.typography[`fontFamily${key.toUpperCase()}`],
              fontSize:
                currentThemeDraft.typography[`fontSize${key.toUpperCase()}`],
            }}
          >
            {key.toUpperCase()}
          </span>

          {/* Dropdown de police */}
          <FontDropdownWrapper $isOpen={openDropdown === key}>
            <button onClick={() => toggleDropdown(key)}>
              {currentThemeDraft.typography[`fontFamily${key.toUpperCase()}`]}
            </button>
            {openDropdown === key && (
              <ul>
                {fontOptions.map((font) => (
                  <li
                    key={font.value}
                    style={{ fontFamily: font.value }}
                    onClick={() => {
                      setCurrentThemeDraft((prev) => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          [`fontFamily${key.toUpperCase()}`]: font.value, // ✅ Correction
                        },
                      }));
                      setOpenDropdown(null);
                    }}
                  >
                    {font.label}
                  </li>
                ))}
              </ul>
            )}
          </FontDropdownWrapper>

          {/* Ajustement de la taille */}
          <FontSizeWrapper>
            <button onClick={() => adjustFontSize(key, -1)}>-</button>
            <span>
              {currentThemeDraft.typography[`fontSize${key.toUpperCase()}`]}
            </span>
            <button onClick={() => adjustFontSize(key, 1)}>+</button>
          </FontSizeWrapper>
        </FontRow>
      ))}

      {/* Boutons d'action */}
      <ButtonGroup>
        <Button
          $variant="secondary"
          onClick={() => setCurrentThemeDraft(currentTheme)}
        >
          🔄 Réinitialiser
        </Button>
        <Button
          $variant="primary"
          onClick={() => updatePreferences(currentThemeDraft)}
        >
          💾 Sauvegarder
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ThemeManager;
