import styled from 'styled-components';

export const ObjectiveItem = styled.li`
  margin-bottom: 16px;
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
  padding: 8px;
  border-radius: 8px;
`;

export const ObjectiveTitle = styled.h3`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.typography.fontSizeH3};
  color: ${({ theme }) => theme.colors.textPrimary};
`;
