import { darken } from 'polished'; // ✅ Pour ajuster les couleurs dynamiquement

/** 🔥 Génère un thème complet à partir des données Firestore */
export const generateTheme = (themeData) => {
  const baseColors = {
    primary: themeData.primary || '#0ba4b3',
    secondary: themeData.secondary || '#617bbe',
    accent: themeData.accent || '#eca72c',
    background: themeData.background || '#111111',
    surface: themeData.surface || '#1e1e1e',
    textPrimary: themeData.text || '#ededed',
    textSecondary: darken(0.2, themeData.text || '#ededed'), // ✅ Génère une variation automatique
  };

  return {
    name: themeData.name || 'Thème inconnu',
    colors: {
      ...baseColors,
      backgroundBase: baseColors.background,
      backgroundSurface: baseColors.surface,
      backgroundHighlight: baseColors.secondary,
      textPrimary: baseColors.textPrimary,
      textSecondary: baseColors.textSecondary,
      accent: baseColors.accent,
      linkPrimary: baseColors.primary,
      linkHover: darken(0.1, baseColors.primary),
      linkActive: darken(0.15, baseColors.primary),
      linkVisited: darken(0.15, baseColors.secondary),
      borderBase: darken(0.1, baseColors.background),
      borderAccent: baseColors.secondary,
      danger: '#B00020',
      dangerHover: '#cc0000',
    },
    typography: {
      fontFamilyH1: themeData.fontFamilyH1 || "'Pacifico', sans-serif",
      fontFamilyH2: themeData.fontFamilyH2 || "'Caveat', sans-serif",
      fontFamilyH3: themeData.fontFamilyH3 || "'Caveat', sans-serif",
      fontFamilyBody: themeData.fontFamilyBody || "'Caveat', sans-serif",

      fontSizeH1: themeData.fontSizeH1 || '24px',
      fontSizeH2: themeData.fontSizeH2 || '24px',
      fontSizeH3: themeData.fontSizeH3 || '22px',
      fontSizeBody: themeData.fontSizeBody || '20px',
    },
  };
};
