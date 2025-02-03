import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;

  .info {
    font-family: ${({ theme }) => theme.typography.fontFamilyBody};
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  a {
    font-family: ${({ theme }) => theme.typography.fontFamilyBody};
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    font-weight: bold;
    color: ${({ theme }) => theme.linkDefault};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
    }

    &:active {
      color: ${({ theme }) => theme.colors.linkActive};
    }
  }
`;
