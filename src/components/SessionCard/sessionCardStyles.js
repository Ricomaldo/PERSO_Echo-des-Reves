import styled from 'styled-components';

export const SessionContent = styled.div`
  margin-top: 8px;
`;

export const SessionDetail = styled.div`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.typography.fontSizeBody};
  color: ${({ theme }) => theme.textSecondary};
`;
