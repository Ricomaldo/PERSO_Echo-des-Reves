import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
  border-radius: 16px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
`;

export const HeaderLogo = styled.img`
  height: 48px;
  width: 48px;
`;

export const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizeHeader};
  text-align: center;
  color: ${({ theme }) => theme.colors.linkPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeightHeader};
  font-family: ${({ theme }) => theme.typography.fontFamilyHeader};
  flex-grow: 1;
`;

export const ProfilWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const StyledImg = styled.img`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  object-fit: cover;
  border: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : theme.colors.linkPrimary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
