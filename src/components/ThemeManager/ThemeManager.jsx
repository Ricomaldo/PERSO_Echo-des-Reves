import { useState, useEffect } from 'react';
import { useTheme } from '../../utils/contexts/ThemeProvider';
import ThemeDropdown from './ThemeDropdown';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import { saveTheme } from '../../utils/firebase/firestoreActions';
import {
  ThemeManagerWrapper,
  Section,
  ColorPickersWrapper,
} from './themeManagerStyles';

const ThemeManager = () => {
  const { themes, selectedTheme, updatePreferences } = useTheme();
  const [draftTheme, setDraftTheme] = useState(selectedTheme);
  const [newThemeName, setNewThemeName] = useState('');
  const [isNewTheme, setIsNewTheme] = useState(false);

  useEffect(() => {
    setDraftTheme(selectedTheme);
  }, [selectedTheme]);

  const handleColorChange = (key, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const handleFontChange = (key, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      typography: { ...prev.typography, [key]: value },
    }));
  };

  const handleSave = () => {
    const themeId = isNewTheme
      ? newThemeName.toLowerCase().replace(/\s+/g, '-')
      : draftTheme.name;

    saveTheme(themeId, draftTheme);
    updatePreferences(themeId);
    setIsNewTheme(false);
    setNewThemeName('');
  };
  console.log(
    '🎨 Couleurs affichées dans ThemeManager :',
    Object.keys(draftTheme.colors)
  );
  console.log('🎨 ThemeManager draftTheme :', draftTheme);
  console.log('🎨 Couleurs affichées :', Object.keys(draftTheme.colors));
  const validColorKeys = [
    'primary',
    'secondary',
    'accent',
    'background',
    'surface',
    'text',
  ];
  const filteredColors = Object.fromEntries(
    Object.entries(draftTheme.colors).filter(([key]) =>
      validColorKeys.includes(key)
    )
  );
  console.log('🎨 Couleurs affichées après filtrage :', filteredColors);

  return (
    <ThemeManagerWrapper>
      <Section>
        <ThemeDropdown themes={themes} onChange={updatePreferences} />
      </Section>
      <Section>
        <ColorPickersWrapper>
          {validColorKeys.map((key) => (
            <ColorPicker
              key={key}
              colorKey={key}
              colorValue={draftTheme.colors[key]}
              onChange={handleColorChange}
            />
          ))}
        </ColorPickersWrapper>
      </Section>
      <Section>
        {[
          { key: 'H1', label: 'Titre 1' },
          { key: 'H2', label: 'Titre 2' },
          { key: 'H3', label: 'Titre 3' },
          { key: 'Body', label: 'Texte' },
        ].map(({ key, label }) => (
          <FontSelector
            key={key}
            keyName={key}
            label={label}
            fontFamily={draftTheme.typography[`fontFamily${key}`]}
            fontSize={draftTheme.typography[`fontSize${key}`]}
            onFontChange={(fontKey, newFont) =>
              setDraftTheme((prev) => ({
                ...prev,
                typography: {
                  ...prev.typography,
                  [`fontFamily${fontKey}`]: newFont,
                },
              }))
            }
            onSizeChange={(sizeKey, increment) =>
              setDraftTheme((prev) => ({
                ...prev,
                typography: {
                  ...prev.typography,
                  [`fontSize${sizeKey}`]: `${
                    parseInt(prev.typography[`fontSize${sizeKey}`]) + increment
                  }px`,
                },
              }))
            }
          />
        ))}
      </Section>
      <Section>
        {isNewTheme ? (
          <>
            <input
              type="text"
              placeholder="Nom du nouveau thème"
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
            />
            <button onClick={handleSave} disabled={!newThemeName.trim()}>
              ➕ Créer le thème
            </button>
            <button onClick={() => setIsNewTheme(false)}>❌ Annuler</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsNewTheme(true)}>
              ➕ Nouveau thème
            </button>
            <button onClick={handleSave}>💾 Sauvegarder</button>
          </>
        )}
      </Section>
    </ThemeManagerWrapper>
  );
};

export default ThemeManager;
