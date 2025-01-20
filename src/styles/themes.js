// src/utils/theme/theme.js

// Couleurs
export const colors = {
  primary: '#0ba4b3',
  secondary: '#0c3434',
  interaction: '#617bbe',
  highlight: '#eca72c',

  textLight: '#333333',
  textDark: '#ededed',

  backgroundLight: ' #F5F5F5',
  backgroundDark: '#111111',
  backgroundNeutralDark: '#1e1e1e',
  backgroundNeutralLight: '#ededed',
  borderNeutral: '#222627',
};

// Typographies
export const typography = {
  fontFamilyHeader: "'Pacifico', sans-serif",
  fontFamilyH1: "'Pacifico', sans-serif",
  fontFamilyH2: "'Caveat', sans-serif",
  fontFamilyBody: "'Caveat', sans-serif",
  fontFamilyNeutral: "'Inter', sans-serif",

  fontSizeHeader: '40px',
  fontSizeH1: '26px',
  fontSizeH2: '20px',
  fontSizeBody: '16px',

  fontWeightHeader: '400',
  fontWeightH1: '400',
  fontWeightH2: '400',
  fontWeightBody: '400',
};

// Thème sombre
export const darkTheme = {
  colors: {
    ...colors,
    background: colors.backgroundDark,
    text: colors.textDark,
    backgroundNeutral: colors.backgroundNeutralDark,
    shadow: 'rgba(255, 255, 255, 0.1)', // Ombre subtile pour le mode sombre
  },
  typography,
};

// Thème clair
export const lightTheme = {
  colors: {
    ...colors,
    background: colors.backgroundLight,
    text: colors.textLight,
    backgroundNeutral: colors.backgroundNeutralLight,
    shadow: 'rgba(0, 0, 0, 0.2)', // Ombre légère pour le mode clair
  },
  typography,
};

// Exporter les thèmes pour utilisation
export const getTheme = (mode) => {
  if (mode === 'dark') {
    return { ...darkTheme }; // Crée une nouvelle instance de darkTheme
  } else {
    return { ...lightTheme }; // Crée une nouvelle instance de lightTheme
  }
};
