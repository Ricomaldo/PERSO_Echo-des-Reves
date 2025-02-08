import styled, { keyframes } from 'styled-components';

// 🌪️ Animation de rotation du spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(12, 52, 52, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid #0ba4b3;
  border-top: 8px solid #eca72c;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
