import styled from 'styled-components';

const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.highlight};

  min-height: 320px;
  width: 100%;
  padding: 16px;

  gap: 16px;
`;

const Frame = ({ children }) => (
  <>
    <FrameContainer>{children}</FrameContainer>
  </>
);
export default Frame;
