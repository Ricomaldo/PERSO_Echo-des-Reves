import { styled } from 'styled-components';
import Frame from '../layout/Frame';

const MissionHubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 32px;
  z-index: 10;
  h1 {
    color: #00ff00;
    font-size: 20px;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
  }
  p {
    color: #00ffff;
    font-size: 16px;
    font-family: 'Orbitron', sans-serif;
  }
  button {
    font-family: 'Orbitron', sans-serif;
    color: #fff;
    background-color: transparent;
    border: 1px solid #fff;
    &:hover {
      border-color: #00ffff;
      box-shadow: 0 0 8px #00ffff;
    }
    &:active {
      color: #00ffff;
      border-color: #fff;
      box-shadow: 0 0 32px #00ffff;
      font-weight: bold;
    }
  }
`;

const MissionHub = ({ children }) => {
  return (
    <Frame>
      <MissionHubContainer>{children}</MissionHubContainer>
    </Frame>
  );
};
export default MissionHub;
