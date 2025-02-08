import { useMemo } from 'react';
import { generateTheme } from './generateTheme';

/** 🔄 Gère l’application et le cache du thème Firestore */
export const useThemeLogic = (preferences, themes) => {
  const themeId = preferences?.favoriteTheme; // ✅ Un seul favori stocké

  const currentTheme = useMemo(() => {
    if (themeId && themes[themeId]) {
      return generateTheme(themes[themeId]);
    }
    return generateTheme({}); // ✅ Utilisation d’un fallback intelligent
  }, [themeId, themes]);
  console.log('🌀 Recalcul du thème dans useThemeLogic :', currentTheme);
  return { currentTheme };
};
