import { darken, lighten } from 'polished';

const generateDerivedColors = (palette) => ({
  // **Palette principale (personnalisable)**
  primary: palette.primary,
  accent: palette.accent,
  secondary: palette.secondary,

  // **Fonds**
  backgroundBaseDark: palette.backgroundBaseDark,
  backgroundBaseLight: palette.backgroundBaseLight,
  backgroundSurfaceDark: palette.backgroundSurfaceDark,
  backgroundSurfaceLight: palette.backgroundSurfaceLight,
  backgroundHighlight: palette.secondary,

  // **Texte**
  textPrimaryDark: palette.textPrimaryDark,
  textPrimaryLight: palette.textPrimaryLight,
  textSecondaryDark: lighten(0.2, defaultPalette.textPrimaryDark),
  textSecondaryLight: darken(0.2, defaultPalette.textPrimaryLight),

  textAccent: palette.accent,

  // **Liens** (dérivés du primaire)
  linkPrimary: palette.primary,
  linkHover: darken(0.1, defaultPalette.primary),
  linkActive: darken(0.15, defaultPalette.primary),
  linkVisited: darken(0.15, defaultPalette.secondary),

  // **Bordures** (dérivées du background et secondary)
  borderBaseDark: darken(0.1, defaultPalette.backgroundBaseDark),
  borderBaseLight: lighten(0.2, defaultPalette.backgroundBaseLight),
  borderAccent: palette.secondary,

  // **Danger** (fixe pour conserver un standard)
  danger: '#B00020',
  dangerHover: '#cc0000',
});

// 🎨 Palette par défaut
const defaultPalette = {
  primary: '#0ba4b3',
  accent: '#eca72c',
  secondary: '#617bbe',
  backgroundBaseDark: '#111111',
  backgroundBaseLight: '#F5F5F5',
  backgroundSurfaceDark: '#1e1e1e',
  backgroundSurfaceLight: '#ededed',
  textPrimaryDark: '#ededed',
  textPrimaryLight: '#333333',
};

const defaultColors = generateDerivedColors(defaultPalette);

export { generateDerivedColors, defaultColors };
