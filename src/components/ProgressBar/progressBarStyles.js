import styled from 'styled-components';

export const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: ${({ theme, $completed }) =>
    $completed ? theme.colors.accent : theme.colors.secondary};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s, background-color 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    width: 12px;
    height: 24px;
    background: ${({ theme, $completed }) =>
      $completed ? theme.colors.accent : theme.colors.primary};
    cursor: pointer;
    transition: background 0.3s ease;
    -webkit-appearance: none;
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
  }
`;
