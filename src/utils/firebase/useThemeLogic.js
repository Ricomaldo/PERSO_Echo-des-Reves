import { useState, useEffect, useMemo } from 'react';
import { getTheme } from '../../styles/theme/themes';
import { generateDerivedColors } from '../../styles/theme/defaultColors';

export const useThemeLogic = (preferences, themes, defaultMode = 'dark') => {
  // 🛠 Si aucun utilisateur sélectionné, on force `default-dark`
  const initialMode = preferences?.themeMode || defaultMode;
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (preferences?.themeMode && preferences.themeMode !== mode) {
      setMode(preferences.themeMode);
    }
  }, [preferences?.themeMode]);

  // 🎨 Génère les couleurs dérivées pour les thèmes Firestore
  const enrichedThemes = useMemo(() => {
    return Object.entries(themes).reduce((acc, [id, theme]) => {
      const baseColors = theme.colors || {
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
        background: theme.background,
        surface: theme.surface,
        text: theme.text,
      };

      return {
        ...acc,
        [id]: { ...theme, colors: generateDerivedColors(baseColors) },
      };
    }, {});
  }, [themes]);

  // 📌 Détermine l'ID du thème à appliquer
  const themeId = preferences?.favoriteThemes?.[mode];

  // 🔥 Applique le bon thème (Firestore ou natif)
  const currentTheme = useMemo(() => {
    if (!preferences || Object.keys(preferences).length === 0) {
      return getTheme('dark'); // 🛠 Applique default-dark si aucune préférence définie
    }

    if (themeId === 'default-dark' || themeId === 'default-light') {
      return getTheme(mode);
    }

    if (themeId && enrichedThemes[themeId]) {
      return enrichedThemes[themeId];
    }

    console.warn(
      `⚠️ Aucun thème Firestore trouvé pour ${themeId}. Utilisation du thème natif.`
    );
    return getTheme(mode);
  }, [mode, preferences, enrichedThemes]);

  return { mode, setMode, currentTheme };
};
