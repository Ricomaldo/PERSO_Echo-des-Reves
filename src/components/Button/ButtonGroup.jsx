import styled from 'styled-components';

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: ${({ $align }) => $align || 'flex-start'};
  gap: ${({ $gap }) => $gap || '8px'};
  flex-wrap: wrap;
  max-width: 320px;
`;

const ButtonGroup = ({ children, $align = 'flex-start', $gap = '8px' }) => {
  return (
    <StyledButtonGroup $align={$align} $gap={$gap}>
      {children}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
