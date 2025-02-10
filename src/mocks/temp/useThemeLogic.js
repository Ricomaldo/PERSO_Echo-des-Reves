import { useMemo } from 'react';
import { generateTheme } from './generateTheme';

export const useThemeLogic = (preferences, themes) => {
  const themeId = preferences?.favoriteTheme;
  console.log('themeId', themeId);
  console.log('themes[themeId]', themes[themeId]);
  const test = generateTheme(themes[themeId]);
  console.log('test', test);
  return useMemo(
    () =>
      themeId && themes[themeId]
        ? generateTheme(themes[themeId])
        : generateTheme({}),
    [themeId, themes]
  );
};
