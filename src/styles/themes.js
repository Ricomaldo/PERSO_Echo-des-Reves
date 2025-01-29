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
  fontFamilyH2: "'Inter', sans-serif",
  fontFamilyH3: "'Inter', sans-serif",
  fontFamilyBody: "' ', sans-serif",
  fontFamilyNeutral: "'Caveat', sans-serif",

  fontSizeHeader: '24px',
  fontSizeH1: '24px',
  fontSizeH2: '20px',
  fontSizeH3: '16px',
  fontSizeBody: '24px',

  fontWeightHeader: '400',
  fontWeightH1: '400',
  fontWeightH2: '400',
  fontWeightH3: '600',
  fontWeightBody: '400',
};

// Thème sombre
export const darkTheme = {
  colors: {
    ...colors,
    background: colors.backgroundDark,
    text: colors.textDark,
    backgroundNeutral: colors.backgroundNeutralDark,
    shadow: 'rgba(255, 255, 255, 0.1)',
  },
  typography,
};

// Thème clair
export const lightTheme = {
  colors: {
    ...colors,
    interaction: '#0c3434',
    secondary: '#617bbe',
    background: colors.backgroundLight,
    text: colors.textLight,
    backgroundNeutral: colors.backgroundNeutralLight,
    shadow: 'rgba(0, 0, 0, 0.2)',
  },
  typography,
};

export const getTheme = (mode) => {
  return mode === 'dark' ? { ...darkTheme } : { ...lightTheme };
};
