import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from '../../styles/theme/themes';
import { useFirestore } from './FirestoreProvider';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { preferences, updatePreferences, themes } = useFirestore();

  const [mode, setMode] = useState(() => {
    return (
      preferences?.themeMode || localStorage.getItem('themeMode') || 'dark'
    );
  });

  // 🔄 Synchroniser `mode` avec Firestore lorsqu'un utilisateur est chargé
  useEffect(() => {
    if (preferences?.themeMode && preferences.themeMode !== mode) {
      setMode(preferences.themeMode);
    }
  }, [preferences?.themeMode]);

  // 🔄 Sauvegarder le mode dans Firestore et localStorage
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);

    // 🔄 Mettre à jour Firestore
    updatePreferences({ ...preferences, themeMode: newMode });
  };

  const currentTheme = useMemo(() => {
    return themes[preferences?.favoriteThemes?.[mode]] || getTheme(mode);
  }, [mode, preferences, themes]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme: currentTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// 🔹 Hook pour utiliser le contexte
export const useTheme = () => useContext(ThemeContext);
