import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
