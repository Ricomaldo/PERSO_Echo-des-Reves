import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useFirestore } from './FirestoreProvider';
import { useThemeLogic } from '../../styles/theme/useThemeLogic';
import { savePreferences } from '../firebase/firestoreActions';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { preferences, themes } = useFirestore();
  const { currentTheme } = useThemeLogic(preferences, themes);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  useEffect(() => {
    if (preferences.favoriteTheme && themes[preferences.favoriteTheme]) {
      console.log(
        '🎨 Thème Firestore détecté :',
        themes[preferences.favoriteTheme]
      );
      setSelectedTheme(themes[preferences.favoriteTheme]); // 🔥 Applique le bon thème
    }
  }, [preferences.favoriteTheme, themes]);

  const updatePreferences = (newThemeId) => {
    const updatedPreferences = { ...preferences, favoriteTheme: newThemeId };
    savePreferences(preferences.user, updatedPreferences);
  };
  console.log('📌 ThemeProvider reçoit :', { themes, preferences });

  return (
    <ThemeContext.Provider value={{ themes, selectedTheme, updatePreferences }}>
      <StyledThemeProvider theme={selectedTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
