import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MenuPlusContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '128px' : '0px')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: height 0.3s ease, opacity 0.3s ease;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  border-radius: 16px 16px 0 0;
  background-color: ${({ theme }) => theme.colors.backgroundBase};
  border: 1px solid ${({ theme }) => theme.colors.borderBase};
  z-index: 100;
`;

export const MenuPlusLinkContainer = styled.div`
  display: flex;
  gap: 80px;
`;

export const MenuPlusLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  border-radius: 25%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Text = styled.p`
  font-family: 'Inter';
  padding: 0 8px;
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.linkPrimary};
`;

export const CancelLink = styled(Link)`
  font-family: 'Inter';
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.linkPrimary};
  text-decoration: none;
  margin-top: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  &:active {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`;
