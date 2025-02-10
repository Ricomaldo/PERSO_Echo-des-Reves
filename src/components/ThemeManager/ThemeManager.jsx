import { useState, useEffect } from 'react';
import { useTheme } from '../../utils/contexts/ThemeProvider';
import ThemeDropdown from './ThemeDropdown';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import { saveTheme } from '../../utils/firebase/firestoreActions';
import { extractPalette } from '../../styles/theme/generateTheme';
import { Button, ButtonGroup } from '../../components/Button';
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
    const updatedTheme = {
      ...draftTheme,
      colors: { ...draftTheme.colors, [key]: value },
    };
    setDraftTheme(updatedTheme);
  };

  const handleFontChange = (key, value) => {
    const updatedTheme = {
      ...draftTheme,
      typography: { ...draftTheme.typography, [key]: value },
    };
    setDraftTheme(updatedTheme);
  };

  const handleSave = () => {
    const themeId = isNewTheme
      ? newThemeName.toLowerCase().replace(/\s+/g, '-')
      : draftTheme.id;

    const palette = extractPalette(draftTheme); // 🔥 Extrait uniquement la palette brute

    const themeToSave = {
      ...draftTheme,
      id: themeId,
      colors: palette, // 🔥 Sauvegarde uniquement la palette brute

      name: newThemeName || draftTheme.name,
    };
    saveTheme(themeId, themeToSave);
    updatePreferences(themeId);

    setIsNewTheme(false);
    setNewThemeName('');
    setDraftTheme(themeToSave);
  };
  const validColorKeys = [
    'primary',
    'secondary',
    'accent',
    'backgroundSurface',
    'backgroundBase',
    'textPrimary',
  ];
  const colorLabels = {
    primary: 'Couleur principale',
    secondary: 'Couleur secondaire',
    accent: 'Accentuation',
    backgroundBase: 'Arrière-plan',
    backgroundSurface: 'Surface',
    textPrimary: 'Texte principal',
  };

  return (
    <ThemeManagerWrapper>
      <Section>
        <h2>Choix du thème</h2>
        <ThemeDropdown
          themes={themes}
          selectedThemeId={draftTheme.id}
          onChange={updatePreferences}
        />
      </Section>
      <Section>
        <h3>Choix des couleurs</h3>
        <ColorPickersWrapper>
          {validColorKeys.map((colorKey) => (
            <ColorPicker
              key={`color-${colorKey}`}
              colorKey={colorKey}
              colorValue={draftTheme.colors[colorKey]}
              label={colorLabels[colorKey]} // 🔥 Label lisible pour chaque couleur
              onChange={handleColorChange}
            />
          ))}
        </ColorPickersWrapper>
      </Section>
      <Section>
        <h3>Choix des polices</h3>
        {['H1', 'H2', 'H3', 'Body'].map((key) => (
          <FontSelector
            key={key}
            keyName={key}
            label={`Titre ${key}`}
            fontFamily={draftTheme.typography[`fontFamily${key}`]}
            fontSize={draftTheme.typography[`fontSize${key}`]}
            onFontChange={handleFontChange}
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
              placeholder="Nom du thème"
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
            />
            <Button onClick={handleSave} disabled={!newThemeName.trim()}>
              ➕ Créer
            </Button>
          </>
        ) : (
          <ButtonGroup>
            <Button onClick={() => setIsNewTheme(true)}>➕ Nouveau</Button>
            <Button onClick={handleSave}>💾 Sauvegarder</Button>
          </ButtonGroup>
        )}
      </Section>
    </ThemeManagerWrapper>
  );
};

export default ThemeManager;
