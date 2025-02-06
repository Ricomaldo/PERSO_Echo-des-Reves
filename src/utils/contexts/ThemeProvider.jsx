import { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useFirestore } from './FirestoreProvider';
import { useThemeLogic } from '../firebase/useThemeLogic';

// 📌 Création du contexte du thème
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Récupération des préférences utilisateur et des thèmes disponibles depuis Firestore
  const { preferences, themes } = useFirestore();

  // Application de la logique du thème (mode clair/sombre + sélection du bon thème)
  const { mode, setMode, currentTheme } = useThemeLogic(preferences, themes);

  // Fonction pour basculer entre mode clair et sombre
  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme: currentTheme }}>
      {' '}
      {/* Fournit le mode, la fonction de bascule et le thème actuel via un contexte global */}
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>{' '}
      {/* Applique le thème sélectionné à tous les composants Styled-Components */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); // Hook personnalisé pour accéder facilement aux valeurs du contexte du thème
