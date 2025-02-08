import { useContext } from 'react';
import { ThemeContext } from '../../utils/contexts/ThemeProvider';
import { ToggleWrapper, ToggleBall, Icon } from './themeToggleStyles';

function ThemeToggle() {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark'; // Détermination directe du mode

  return (
    <ToggleWrapper
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Basculer entre le mode clair et sombre"
    >
      <Icon>☀️</Icon>
      <ToggleBall $isDarkMode={isDarkMode} />
      <Icon>🌙</Icon>
    </ToggleWrapper>
  );
}

export default ThemeToggle;
