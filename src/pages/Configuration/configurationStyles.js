import styled from 'styled-components';

export const GiphyWrapper = styled.div`
  width: 320px;
  height: 0;
  padding-bottom: 51%;
  position: relative;
  margin-top: 32px;
  margin-bottom: 32px;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none; /* Désactive les clics sur l'iframe */
  }
`;

export const ThemeToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
