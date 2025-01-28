import styled from 'styled-components';

const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px dashed ${({ theme }) => theme.colors.highlight};

  // min-height: 320px;
  padding: 16px;
  width: 100%;
  gap: 16px;
`;

const Frame = ({ children }) => (
  <>
    <FrameContainer>{children}</FrameContainer>
  </>
);
export default Frame;
