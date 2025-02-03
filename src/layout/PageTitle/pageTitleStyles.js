import styled from 'styled-components';

export const PageTitleContainer = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.textAccent};
`;
