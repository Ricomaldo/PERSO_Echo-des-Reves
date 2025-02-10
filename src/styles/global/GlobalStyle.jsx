import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../../utils/contexts/ThemeProvider';

const StyledGlobalStyle = createGlobalStyle`
  /* Style global pour le body */
  body {
    color: ${({ theme }) => theme.colors.textPrimary || '#ededed'};
    background-color: ${({ theme }) => theme.colors.background || '#1e1e1e'};
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyBody || "'Caveat', sans-serif"};
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '16px'};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
    margin: 0;
    padding: 0;
  }

  /* Style global pour les titres */
  h1, h2, h3 {
    margin: 0;
  }

  h1 {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyH1 || "'Pacifico', sans-serif"};
    font-weight: ${({ theme }) => theme.typography.fontWeightH1 || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeH1 || '28px'};
    color: ${({ theme }) => theme.colors.textPrimary || '#ededed'};
  }

  h2 {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyH2 || "'Caveat', sans-serif"};
    font-weight: ${({ theme }) => theme.typography.fontWeightH2 || '500'};
    font-size: ${({ theme }) => theme.typography.fontSizeH2 || '24px'};
    color: ${({ theme }) => theme.colors.textPrimary || '#ededed'};
  }

  h3 {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyH3 || "'Caveat', sans-serif"};
    font-weight: ${({ theme }) => theme.typography.fontWeightH3 || '500'};
    font-size: ${({ theme }) => theme.typography.fontSizeH3 || '20px'};
    color: ${({ theme }) => theme.colors.textPrimary || '#ededed'};
  }

  /* Style global pour les paragraphes et les listes */
  p, li {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyBody || "'Inter', sans-serif"};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '16px'};
    color: ${({ theme }) => theme.colors.textSecondary || '#bdbdbd'};
    line-height: 1.5;
    margin: 0 0 8px;
  }

  /* Style global pour les liens */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.linkPrimary || '#617bbe'};
    &:hover {
      color: ${({ theme }) => theme.colors.linkHover || '#4e68a9'};
    }
    &:active {
      color: ${({ theme }) => theme.colors.linkActive || '#eca72c'};
    }
    &:visited {
      color: ${({ theme }) => theme.colors.linkVisited || '#4e6d9c'};
    }
  }

  /* Style global pour les boutons */
  button {
    background-color: ${({ theme }) =>
      theme.colors.backgroundHighlight || '#0c3434'};
    color: ${({ theme }) => theme.colors.textPrimary || '#ededed'};
    border: 1px solid ${({ theme }) => theme.colors.borderBase || '#222627'};
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyNeutral || "'Inter', sans-serif"};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.linkHover || '#4e68a9'};
      color: ${({ theme }) => theme.colors.accent || '#eca72c'};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.linkActive || '#eca72c'};
      color: ${({ theme }) => theme.colors.textPrimary || '#ededed'};
    }
  }

  /* Style global pour la scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.backgroundHighlight || '#4e68a9'};
    border-radius: 4px;
    transition: background 0.3s;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.linkHover || '#617bbe'};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSurface || '#1e1e1e'};
    border-radius: 4px;
  }
`;

function GlobalStyle() {
  const { selectedTheme } = useContext(ThemeContext);
  console.log('🖌️ selectedTheme dans GlobalStyle :', selectedTheme);

  return <StyledGlobalStyle theme={selectedTheme} />;
}

export default GlobalStyle;
