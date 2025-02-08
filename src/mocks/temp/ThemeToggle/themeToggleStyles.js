import styled from 'styled-components';

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 64px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
  border-radius: 30px;
  padding: 0 5px;
  position: relative;
  transition: background-color 0.3s ease;
`;

export const ToggleBall = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ $isDarkMode }) => ($isDarkMode ? 'calc(100% - 26px)' : '4px')};
  transition: left 0.3s ease, background-color 0.3s ease;
`;

export const Icon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeBody};
  color: ${({ theme }) => theme.colors.textPrimary};
  z-index: 1;
`;
