import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

export const SessionNavigation = styled.div`
  display: flex;
  justify-content: ${({ $hasMultipleSessions }) =>
    $hasMultipleSessions ? 'space-between' : 'center'};
  gap: 16px;
  margin-top: 8px;
  width: 100%;
`;
