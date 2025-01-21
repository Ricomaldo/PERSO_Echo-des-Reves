import { createContext, useState, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from '../../styles/themes';
import { useUser } from './UserProvider';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { activeUser, setActiveUser } = useUser(); // Récupère setActiveUser
  const [mode, setMode] = useState('dark');

  const toggleTheme = () => {
    if (activeUser?.theme) {
      setActiveUser((prev) => ({
        ...prev,
        theme: prev.theme === 'light' ? 'dark' : 'light',
      }));
    } else {
      setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };

  const currentTheme = useMemo(() => {
    const userMode = activeUser?.theme || mode; // Priorité au mode utilisateur
    const baseTheme = getTheme(userMode); // Récupère le thème basé sur le mode

    if (activeUser?.customTheme) {
      return {
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          ...activeUser.customTheme,
        },
      };
    }

    return baseTheme;
  }, [mode, activeUser]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme: currentTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
