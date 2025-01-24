import styled from 'styled-components';

const StyledButton = styled.button`
  flex: 1;
  padding: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: ${({ theme, variant }) =>
    variant === 'secondary'
      ? theme.colors.secondary
      : variant === 'delete'
      ? '#600000'
      : theme.colors.text};
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'delete'
      ? theme.colors.background
      : theme.colors.background};
  border: ${({ theme, variant }) =>
    variant === 'secondary'
      ? `1px solid ${theme.colors.secondary}`
      : variant === 'delete'
      ? '1px solid #600000'
      : 'none'};
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'primary'
        ? theme.colors.interaction
        : variant === 'secondary'
        ? theme.colors.backgroundNeutral
        : '#ffcccc'};
    color: ${({ theme, variant }) =>
      variant === 'secondary' || variant === 'delete'
        ? theme.colors.primary
        : theme.colors.textHighlight};
  }

  &:active {
    background-color: ${({ theme, variant }) =>
      variant === 'primary'
        ? theme.colors.highlight
        : variant === 'secondary'
        ? theme.colors.background
        : '#cc0000'};
    color: ${({ theme, variant }) =>
      variant === 'delete' ? '#ffffff' : theme.colors.text};
    opacity: 0.8;
  }
`;

const Button = ({ children, variant = 'primary', onClick }) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
