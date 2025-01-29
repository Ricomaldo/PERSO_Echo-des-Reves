import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeToggle from '../components/ThemeToggle';

const GiphyWrapper = styled.div`
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
const ThemeToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Configuration = () => (
  <>
    {' '}
    <Link to="/Adventure">
      <GiphyWrapper>
        <iframe
          src="https://giphy.com/embed/26FmQ6EOvLxp6cWyY"
          allowFullScreen
        ></iframe>
      </GiphyWrapper>{' '}
    </Link>
    <ThemeToggleWrapper>
      <ThemeToggle />
    </ThemeToggleWrapper>
  </>
);

export default Configuration;
