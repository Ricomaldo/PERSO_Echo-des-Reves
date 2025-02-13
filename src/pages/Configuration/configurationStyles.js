import styled from 'styled-components';
export const GiphyWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 51%;
  position: relative;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none; /* Désactive les clics sur l'iframe */
    border-radius: 16px;
  }
`;
