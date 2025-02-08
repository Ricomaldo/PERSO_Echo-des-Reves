import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-family: 'Inter';
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  input,
  textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    border-radius: 8px;
    padding: 8px;
    font-family: ${({ theme }) => theme.typography.fontFamilyBody};
    font-size: ${({ theme }) => theme.typography.fontSizeBody};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }

  textarea {
    height: 100px;
    resize: none;
  }

  .react-datepicker-popper {
    z-index: 1050;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;
