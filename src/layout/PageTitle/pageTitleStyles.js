import styled from 'styled-components';

export const PageTitleContainer = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.accent};
`;
