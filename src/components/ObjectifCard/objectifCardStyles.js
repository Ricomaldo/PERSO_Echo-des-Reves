import styled from 'styled-components';

export const ObjectiveItem = styled.li`
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderAccent};
  padding: 8px;
  border-radius: 8px;
`;

export const ObjectiveTitle = styled.h3`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.typography.fontSizeH3};
  color: ${({ theme }) => theme.colors.textPrimary};
`;
export const StarDisplay = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 4px;
  i {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
