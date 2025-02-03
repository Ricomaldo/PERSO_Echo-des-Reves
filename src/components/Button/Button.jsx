import { StyledButton } from './buttonStyles';

const Button = ({
  children,
  $variant = 'primary',
  onClick,
  $fullWidth = false,
  $minWidth = 'auto',
  $maxWidth = 'auto',
  disabled = false,
}) => {
  return (
    <StyledButton
      $variant={$variant}
      onClick={onClick}
      $fullWidth={$fullWidth}
      $minWidth={$minWidth}
      $maxWidth={$maxWidth}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
