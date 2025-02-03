import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TabBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
  position: relative;
  z-index: 50;
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
  border-radius: 16px;
`;

export const TabBarLink = styled(Link)`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  border-radius: 25%;

  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }
`;

export const TabBarIcon = styled.div`
  width: 40px;
  height: 40px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.linkActive : theme.colors.linkPrimary};

  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};

    transform: scale(1.1);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const MenuButton = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  border-radius: 25%;
  border: none;
  cursor: pointer;
`;
