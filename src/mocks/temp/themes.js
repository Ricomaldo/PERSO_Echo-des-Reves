// themes.js
import { darkColors, lightColors } from '../../mocks/defaultColors';

// Typographie partagée
const sharedTypography = {
  fontFamilyHeader: "'Pacifico', sans-serif",
  fontFamilyH1: "'Pacifico', sans-serif",
  fontFamilyH2: "'Caveat', sans-serif",
  fontFamilyH3: "'Caveat', sans-serif",
  fontFamilyBody: "'Caveat', sans-serif",
  fontFamilyNeutral: "'Inter', sans-serif",

  fontSizeHeader: '28px',
  fontSizeH1: '24px',
  fontSizeH2: '24px',
  fontSizeH3: '22px',
  fontSizeBody: '20px',

  fontWeightHeader: '600',
  fontWeightH1: '400',
  fontWeightH2: '600',
  fontWeightH3: '700',
  fontWeightBody: '400',
};

// ✅ Génération propre des thèmes système
const darkTheme = {
  colors: darkColors,
  typography: sharedTypography,
};

const lightTheme = {
  colors: lightColors,
  typography: sharedTypography,
};

// Fonction pour obtenir un thème
export const getTheme = (mode) => (mode === 'dark' ? darkTheme : lightTheme);
