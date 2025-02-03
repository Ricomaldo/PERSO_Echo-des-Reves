import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme } from '../../styles/theme/themes';
import { useUser } from './UserProvider';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { activeUser, setActiveUser } = useUser(); // UserProvider en amont
  const [mode, setMode] = useState(activeUser?.theme || 'dark'); // Utilise le mode utilisateur s'il existe

  // 🔄 Met à jour le mode si activeUser.theme change
  useEffect(() => {
    if (activeUser?.theme) {
      setMode(activeUser.theme);
    }
  }, [activeUser?.theme]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    if (activeUser?.theme) {
      setActiveUser((prev) => ({
        ...prev,
        theme: newMode,
      }));
    }
    setMode(newMode); // 🔄 Met à jour `mode` dans tous les cas
  };

  const currentTheme = useMemo(() => {
    const baseTheme = getTheme(mode); // Utilise `mode`, mis à jour correctement

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

export const useTheme = () => useContext(ThemeContext);
