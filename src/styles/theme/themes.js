import defaultColors from './defaultColors';

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
  fontSizeH3: '20px',
  fontSizeBody: '20px',

  fontWeightHeader: '600',
  fontWeightH1: '400',
  fontWeightH2: '600',
  fontWeightH3: '700',
  fontWeightBody: '400',
};

// Définition des thèmes
const darkTheme = {
  // Couleurs
  colors: {
    primary: defaultColors.primary,
    accent: defaultColors.accent,
    secondary: defaultColors.secondary,

    textPrimary: defaultColors.textPrimaryDark,
    textSecondary: defaultColors.textSecondaryDark,
    textAccent: defaultColors.textAccent,
    backgroundBase: defaultColors.backgroundBaseDark,
    backgroundSurface: defaultColors.backgroundSurfaceDark,
    backgroundHighlight: defaultColors.backgroundHighlight,
    linkPrimary: defaultColors.linkPrimary,
    linkHover: defaultColors.linkHover,
    linkActive: defaultColors.linkActive,
    linkVisited: defaultColors.linkVisited,
    borderBase: defaultColors.borderBaseDark,
    borderAccent: defaultColors.borderAccent,
    danger: defaultColors.danger,
    dangerHover: defaultColors.dangerHover,
  },

  // Typographies
  typography: sharedTypography,
};

const lightTheme = {
  // Couleurs
  colors: {
    primary: defaultColors.primary,
    accent: defaultColors.accent,
    secondary: defaultColors.secondary,

    textPrimary: defaultColors.textPrimaryLight,
    textSecondary: defaultColors.textSecondaryLight,
    textAccent: defaultColors.textAccent,
    backgroundBase: defaultColors.backgroundBaseLight,
    backgroundSurface: defaultColors.backgroundSurfaceLight,
    backgroundHighlight: defaultColors.backgroundHighlight,
    linkPrimary: defaultColors.linkPrimary,
    linkHover: defaultColors.linkHover,
    linkActive: defaultColors.linkActive,
    linkVisited: defaultColors.linkVisited,
    borderBase: defaultColors.borderBaseLight,
    borderAccent: defaultColors.borderAccent,
    danger: defaultColors.danger,
    dangerHover: defaultColors.dangerHover,
  },

  // Typographies
  typography: sharedTypography,
};

// Fonction pour obtenir le thème
export const getTheme = (mode) => {
  return mode === 'dark' ? { ...darkTheme } : { ...lightTheme };
};
