import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../utils/context';

const StyledGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
  color: ${({ theme }) =>
    theme.colors.text || '#000000'}; /* Valeur par défaut */
    background-color: ${({ theme }) =>
      theme.colors.background || '#ffffff'}; /* Valeur par défaut */
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyBody || 'Arial, sans-serif'};
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '16px'};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 812px;
    padding: 8px;
    gap:32px;
  }

  main {
  position:relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap:32px;
    flex-grow: 1;
    padding-bottom: 64px;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  h1 {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyH1 || 'Pacifico, sans-serif'};
    font-weight: ${({ theme }) => theme.typography.fontWeightH1 || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeH1 || '20px'};
    color: ${({ theme }) => theme.colors.highlight || '#000000'};
  }

  h2, h3 {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyH2 || 'Caveat, sans-serif'};
    font-weight: ${({ theme }) => theme.typography.fontWeightH2 || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeH2 || '20px'};
  }

  p, li {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyBody || 'Caveat, sans-serif'};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '16px'};
  }
`;

function GlobalStyle() {
  const { theme } = useContext(ThemeContext);

  return <StyledGlobalStyle theme={theme} />;
}

export default GlobalStyle;
