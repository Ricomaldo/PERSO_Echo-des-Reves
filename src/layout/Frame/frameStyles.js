import styled from 'styled-components';

export const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px dashed ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  width: 100%;
  gap: 16px;
`;
