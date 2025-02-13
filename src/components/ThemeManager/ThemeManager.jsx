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
import { generateTheme } from '../../styles/theme/generateTheme';
const ThemeManager = () => {
  const {
    activeUser,
    themes,
    draftTheme,
    handleColorChange,
    handleFontChange,
    handleSizeChange,
    handleDarkModeChange,
    updatePreferences,
    isAuthor,
  } = useTheme();
  const [newThemeName, setNewThemeName] = useState('');
  const [isNewTheme, setIsNewTheme] = useState(false);

  const handleSave = () => {
    const themeId = isNewTheme
      ? newThemeName.toLowerCase().replace(/\s+/g, '-')
      : draftTheme.id;
    const palette = extractPalette(draftTheme);

    const updatedTheme = generateTheme({
      ...draftTheme,
      author: activeUser.name,
      colors: palette,
      darkMode: draftTheme.darkMode || false,
      name: newThemeName || draftTheme.name,
    });

    saveTheme(themeId, updatedTheme).then(() => {
      updatePreferences(themeId, updatedTheme);
      setIsNewTheme(false);
      setNewThemeName('');
    });
  };

  const validColorKeys = [
    'primary',
    'backgroundBase',
    'secondary',
    'backgroundSurface',
    'accent',
    'textPrimary',
  ];
  const colorLabels = {
    primary: 'Primaire',
    backgroundBase: 'Background',
    secondary: 'Secondaire',
    backgroundSurface: 'Surface',
    accent: 'Accentuation',
    textPrimary: 'Texte',
  };
  const fontLabels = {
    H1: 'Titre 1 :',
    H2: 'Titre 2 :',
    H3: 'Titre 3 :',
    Body: 'Texte :',
  };

  console.log('draftTheme', draftTheme);
  return (
    <ThemeManagerWrapper>
      <Section>
        <ThemeDropdown
          themes={themes}
          selectedThemeId={draftTheme.id}
          onChange={updatePreferences}
        />
      </Section>
      <Section>
        {/* <h3>Choix des couleurs</h3> */}
        <ColorPickersWrapper>
          {validColorKeys.map((colorKey) => (
            <ColorPicker
              key={`color-${colorKey}`}
              colorKey={colorKey}
              colorValue={draftTheme.colors[colorKey]}
              label={colorLabels[colorKey]}
              onChange={handleColorChange}
              isAuthor={isAuthor} // �� Utilisation correcte des props
            />
          ))}
        </ColorPickersWrapper>
      </Section>
      <Section>
        {/* <h3>Choix des polices</h3> */}
        {['H1', 'H2', 'H3', 'Body'].map((key) => (
          <FontSelector
            key={key}
            keyName={key}
            label={fontLabels[key]} // 🔥 Utilisation correcte des labels
            fontFamily={draftTheme.typography[`fontFamily${key}`]}
            fontSize={draftTheme.typography[`fontSize${key}`]}
            onFontChange={handleFontChange}
            onSizeChange={handleSizeChange}
          />
        ))}
      </Section>
      <Section>
        <label>
          <input
            type="checkbox"
            checked={draftTheme.darkMode}
            onChange={(e) => handleDarkModeChange(e.target.checked)}
          />
          Mode sombre
        </label>
      </Section>

      <Section>
        {isNewTheme ? (
          <>
            <input
              type="text"
              placeholder="Nom du thème"
              value={newThemeName}
              onChange={(e) => {
                setNewThemeName(e.target.value);
              }}
            />
            <Button onClick={handleSave} disabled={!newThemeName.trim()}>
              ➕ Créer
            </Button>
          </>
        ) : (
          <ButtonGroup>
            <Button
              $variant="primary"
              onClick={() => {
                setIsNewTheme(true);
              }}
            >
              ➕ Nouveau
            </Button>
            {isAuthor && <Button onClick={handleSave}>💾 Sauvegarder</Button>}
          </ButtonGroup>
        )}
      </Section>
    </ThemeManagerWrapper>
  );
};

export default ThemeManager;
