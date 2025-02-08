import { darken, lighten } from 'polished';

const generateDerivedColors = (palette) => ({
  primary: palette.primary,
  accent: palette.accent,
  secondary: palette.secondary,

  backgroundBase: palette.background,
  backgroundSurface: palette.surface,
  textPrimary: palette.text,
  textSecondary: palette.text,

  accent: palette.accent,
  linkPrimary: palette.primary,
  linkHover: darken(0.1, palette.primary),
  linkActive: darken(0.15, palette.primary),
  linkVisited: darken(0.15, palette.secondary),

  borderBase: darken(0.1, palette.background),
  borderAccent: palette.secondary,
  danger: '#B00020',
  dangerHover: '#cc0000',
});

// 🎨 Palette de base pour les thèmes système
const defaultPalette = {
  primary: '#0ba4b3',
  accent: '#eca72c',
  secondary: '#617bbe',

  background: {
    dark: '#111111',
    light: '#F5F5F5',
  },
  surface: {
    dark: '#1e1e1e',
    light: '#ededed',
  },
  text: {
    dark: '#ededed',
    light: '#333333',
  },
};

// ⚡ Appliquer `generateDerivedColors()` sur les thèmes système
const darkColors = generateDerivedColors({
  primary: defaultPalette.primary,
  accent: defaultPalette.accent,
  secondary: defaultPalette.secondary,
  background: defaultPalette.background.dark,
  surface: defaultPalette.surface.dark,
  text: defaultPalette.text.dark,
});

const lightColors = generateDerivedColors({
  primary: defaultPalette.primary,
  accent: defaultPalette.accent,
  secondary: defaultPalette.secondary,
  background: defaultPalette.background.light,
  surface: defaultPalette.surface.light,
  text: defaultPalette.text.light,
});

// ✅ Exporte les thèmes système
export { darkColors, lightColors, generateDerivedColors };
