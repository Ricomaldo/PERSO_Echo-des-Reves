import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useFirestore } from './FirestoreProvider';
import { savePreferences } from '../firebase/firestoreActions';
import { generateTheme } from '../../styles/theme/generateTheme';
import { useUser } from './UserProvider';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { preferences, themes } = useFirestore();
  const { activeUser } = useUser();
  const [draftTheme, setDraftTheme] = useState(() =>
    preferences.favoriteTheme && themes[preferences.favoriteTheme]
      ? {
          ...generateTheme(themes[preferences.favoriteTheme]),
          id: preferences.favoriteTheme,
        }
      : generateTheme({})
  );

  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    setIsAuthor(draftTheme.author === activeUser.name);
  }, [draftTheme, activeUser]);

  useEffect(() => {
    setDraftTheme(
      preferences.favoriteTheme && themes[preferences.favoriteTheme]
        ? {
            ...generateTheme(themes[preferences.favoriteTheme]),
            id: preferences.favoriteTheme,
          }
        : generateTheme({})
    );
  }, [preferences.favoriteTheme, themes]);

  const handleColorChange = (key, value) => {
    const normalizedColor =
      value.length === 4
        ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
        : value;

    setDraftTheme((prev) => {
      const newColors = { ...prev.colors, [key]: normalizedColor };
      const updatedTheme = generateTheme({
        ...prev,
        colors: newColors,
      });

      return {
        ...updatedTheme,
      };
    });
  };

  const handleFontChange = (key, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      typography: { ...prev.typography, [`fontFamily${key}`]: value },
    }));
  };

  const handleSizeChange = (sizeKey, increment) => {
    setDraftTheme((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [`fontSize${sizeKey}`]: `${
          parseInt(prev.typography[`fontSize${sizeKey}`]) + increment
        }px`,
      },
    }));
  };

  const handleDarkModeChange = (isDark) => {
    setDraftTheme((prev) => ({
      ...prev,
      darkMode: isDark,
    }));
  };

  const updatePreferences = (newThemeId, savedTheme = null) => {
    if (!newThemeId) return;
    const updatedTheme = generateTheme(savedTheme || themes[newThemeId]);
    if (!updatedTheme) return;

    savePreferences(preferences.user, {
      ...preferences,
      favoriteTheme: newThemeId,
    });

    setDraftTheme({ ...updatedTheme, id: newThemeId });
    setIsAuthor(updatedTheme?.author === activeUser);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeUser,
        themes,
        draftTheme,
        handleColorChange,
        handleFontChange,
        handleSizeChange,
        handleDarkModeChange,
        updatePreferences,
        isAuthor,
      }}
    >
      <StyledThemeProvider key={draftTheme.id} theme={draftTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
