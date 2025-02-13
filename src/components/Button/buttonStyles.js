import styled from 'styled-components';

// 🎨 Variantes des boutons
export const buttonVariants = {
  primary: (theme) => ({
    background: theme.colors.linkPrimary,
    color: theme.colors.textPrimary,
    border: 'none',
    hoverBackground: theme.colors.linkHover,
    hoverColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
    activeBackground: theme.colors.linkActive,
    activeColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
  }),
  secondary: (theme) => ({
    background: theme.colors.secondary,
    color: theme.colors.textPrimary,
    border: `2px solid ${theme.colors.borderAccent}`,
    hoverBackground: theme.colors.backgroundSurface,
    hoverColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
    activeBackground: theme.colors.background,
    activeColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
  }),
  delete: (theme) => ({
    background: 'transparent',
    color: theme.colors.danger,
    border: `2px solid ${theme.colors.danger}`,
    hoverBackground: theme.colors.dangerHover,
    hoverColor: '#fff', // 🔥 Ajouté ici !
    activeBackground: '#cc0000',
    activeColor: '#fff', // 🔥 Ajouté ici !
  }),
  outline: (theme) => ({
    background: 'transparent',
    color: theme.colors.textPrimary,
    border: `2px solid ${theme.colors.textPrimary}`,
    hoverBackground: theme.colors.linkPrimary,
    hoverColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
    activeBackground: theme.colors.background,
    activeColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
  }),
  ghost: (theme) => ({
    background: 'transparent',
    color: theme.textSecondary,
    border: 'none',
    hoverBackground: theme.backgroundHighlight,
    hoverColor: theme.textPrimary, // 🔥 Ajouté ici !
    activeBackground: theme.colors.backgroundSurface,
    activeColor: theme.colors.textPrimary, // 🔥 Ajouté ici !
  }),
};

// 🖌️ Style du bouton
export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: ${({ $minWidth }) => $minWidth || 'auto'};
  max-width: ${({ $maxWidth }) => $maxWidth || 'auto'};

  padding: 8px 12px;
  font-family: 'Inter';
  font-size: 16px;

  background-color: ${({ theme, $variant }) =>
    buttonVariants[$variant]?.(theme).background};
  color: ${({ theme, $variant }) => buttonVariants[$variant]?.(theme).color};
  border: ${({ theme, $variant }) => buttonVariants[$variant]?.(theme).border};
  border-radius: 24px;
  cursor: pointer;
  // transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme, $variant }) =>
      buttonVariants[$variant]?.(theme).hoverBackground};
    color: ${({ theme, $variant }) =>
      buttonVariants[$variant]?.(theme).hoverColor}; // ✅ Applique hoverColor
  }

  &:active {
    background-color: ${({ theme, $variant }) =>
      buttonVariants[$variant]?.(theme).activeBackground};
    color: ${({ theme, $variant }) =>
      buttonVariants[$variant]?.(theme).activeColor}; // ✅ Applique activeColor
    opacity: 0.8;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundSurface};
    color: ${({ theme }) => theme.textSecondary};
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    cursor: not-allowed;
    opacity: 0.5;
  }
  opacity: 0.7;
  transition: all 0.2s, background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 1;
  }
`;
