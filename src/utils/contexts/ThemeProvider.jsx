import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useFirestore } from './FirestoreProvider';
import { savePreferences } from '../firebase/firestoreActions';
import { generateTheme } from '../../styles/theme/generateTheme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { preferences, themes } = useFirestore();

  // 🌟 Charge depuis localStorage en priorité
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const storedTheme = localStorage.getItem('selectedTheme');
    return storedTheme
      ? JSON.parse(storedTheme)
      : generateTheme(themes[preferences.favoriteTheme]);
  });

  useEffect(() => {
    if (preferences.favoriteTheme && themes[preferences.favoriteTheme]) {
      const newTheme = generateTheme(themes[preferences.favoriteTheme]);
      setSelectedTheme(newTheme);
      localStorage.setItem('selectedTheme', JSON.stringify(newTheme)); // ✅ Stocke pour persistance
    }
  }, [preferences.favoriteTheme, themes]);

  const updatePreferences = (newThemeId) => {
    if (!newThemeId) return;

    savePreferences(preferences.user, {
      ...preferences,
      favoriteTheme: newThemeId,
    });
    const updatedTheme = generateTheme(themes[newThemeId]);
    setSelectedTheme(updatedTheme);
    localStorage.setItem('selectedTheme', JSON.stringify(updatedTheme));
  };
  const applyDraftTheme = (draftTheme) => {
    if (draftTheme) {
      setSelectedTheme(draftTheme); // Applique le thème temporairement
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        themes,
        selectedTheme,
        updatePreferences,
        applyDraftTheme, // Ajout du callback
      }}
    >
      <StyledThemeProvider theme={selectedTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
