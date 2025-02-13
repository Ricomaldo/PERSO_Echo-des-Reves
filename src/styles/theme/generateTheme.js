import { darken, lighten } from 'polished';

/** 🔥 Génère un thème complet à partir des données Firestore */
export const generateTheme = (themeData = {}) => {
  const isDark = themeData.darkMode ?? false; // ✅ Par défaut en mode clair

  const normalizeColor = (color) => {
    if (!color) return '#000000';
    if (color.length === 4) {
      // Convertit `#rgb` en `#rrggbb`
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return color;
  };
  const baseColors = {
    primary: normalizeColor(themeData.colors?.primary) || '#0ba4b3',
    secondary: normalizeColor(themeData.colors?.secondary) || '#617bbe',
    accent: normalizeColor(themeData.colors?.accent) || '#eca72c',
    backgroundBase:
      normalizeColor(themeData.colors?.backgroundBase) || '#111111',
    backgroundSurface:
      normalizeColor(themeData.colors?.backgroundSurface) || '#1e1e1e',
    textPrimary: normalizeColor(themeData.colors?.textPrimary) || '#ededed',
  };

  return {
    id: themeData.id || 'default-dark',
    name: themeData.name || 'Thème inconnu',
    darkMode: isDark, // ✅ Ajout du mode sombre
    author: themeData.author,
    colors: {
      ...baseColors,
      backgroundHighlight: isDark
        ? darken(0.15, baseColors.secondary)
        : lighten(0.15, baseColors.secondary),
      textSecondary: baseColors.textPrimary,
      linkPrimary: baseColors.primary,
      linkHover: darken(0.1, baseColors.primary),
      linkActive: darken(0.15, baseColors.primary),
      linkVisited: darken(0.15, baseColors.secondary),
      borderBase: isDark
        ? lighten(0.1, baseColors.backgroundBase)
        : darken(0.1, baseColors.backgroundBase),
      borderAccent: baseColors.secondary,
      danger: '#B00020',
      dangerHover: '#cc0000',
    },
    typography: {
      fontFamilyH1:
        themeData.typography?.fontFamilyH1 || "'Pacifico', sans-serif",
      fontFamilyH2:
        themeData.typography?.fontFamilyH2 || "'Caveat', sans-serif",
      fontFamilyH3:
        themeData.typography?.fontFamilyH3 || "'Caveat', sans-serif",
      fontFamilyBody:
        themeData.typography?.fontFamilyBody || "'Caveat', sans-serif",
      fontSizeH1: themeData.typography?.fontSizeH1 || '24px',
      fontSizeH2: themeData.typography?.fontSizeH2 || '24px',
      fontSizeH3: themeData.typography?.fontSizeH3 || '22px',
      fontSizeBody: themeData.typography?.fontSizeBody || '20px',
    },
  };
};

// 🔧 Extrait les 6 couleurs principales à partir d'un thème complet
export const extractPalette = (theme) => {
  return {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
    backgroundBase: theme.colors.backgroundBase,
    backgroundSurface: theme.colors.backgroundSurface,
    textPrimary: theme.colors.textPrimary, // Correspondance avec `textPrimary`
  };
};
