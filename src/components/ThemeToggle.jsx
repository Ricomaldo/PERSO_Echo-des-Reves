import { useContext } from 'react';
import { ThemeContext } from '../utils/contexts/ThemeProvider';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 64px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border: 2px solid ${({ theme }) => theme.colors.borderNeutral};
  border-radius: 30px;
  padding: 0 5px;
  position: relative;
  transition: background-color 0.3s ease;
`;

const ToggleBall = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ theme }) =>
    theme.colors.background === theme.colors.backgroundDark
      ? 'calc(100% - 26px)'
      : '4px'};
  transition: left 0.3s ease, background-color 0.3s ease;
`;

const Icon = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  z-index: 1;
`;

function ThemeToggle() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <ToggleWrapper onClick={toggleTheme}>
      <Icon>☀️</Icon>
      <ToggleBall />
      <Icon>🌙</Icon>
    </ToggleWrapper>
  );
}

export default ThemeToggle;
