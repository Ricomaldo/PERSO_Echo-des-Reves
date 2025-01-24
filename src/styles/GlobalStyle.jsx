import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../utils/contexts/ThemeProvider';

const StyledGlobalStyle = createGlobalStyle`


  body {
    color: ${({ theme }) => theme.colors.text || '#ededed'};
    background-color: ${({ theme }) => theme.colors.background || '#1e1e1e'};

    font-family: ${({ theme }) =>
      theme.typography.fontFamilyBody || 'Inter, sans-serif'};
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '16px'};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
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
      theme.typography.fontFamilyH2 || 'Inter, sans-serif'};
    font-weight: ${({ theme }) => theme.typography.fontWeightH2 || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeH2 || '20px'};
        color: ${({ theme }) => theme.colors.text || '#ededed'};

  }

  p, li {
    font-family: ${({ theme }) =>
      theme.typography.fontFamilyBody || 'Caveat, sans-serif'};
    font-weight: ${({ theme }) => theme.typography.fontWeightBody || '400'};
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '16px'};
  }

  a
  {
  text-decoration: none;
  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
     color: ${({ theme }) => theme.colors.interaction};
  }
  &:active {
   color: ${({ theme }) => theme.colors.primary};
  }}
`;

function GlobalStyle() {
  const { theme } = useContext(ThemeContext);

  return <StyledGlobalStyle theme={theme} />;
}

export default GlobalStyle;
