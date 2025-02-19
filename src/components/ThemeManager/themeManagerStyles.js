import styled from 'styled-components';

// 🧩 Wrapper principal
export const ThemeManagerWrapper = styled.div`
  padding: 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  align-items: center;

  gap: 8px;
  font-size: ${({ theme }) => theme.typography.fontSizeBody};
  select,
  input {
    padding: 2px 8px;
    border: 0;
    border-radius: 16px;
    font-size: ${({ theme }) => theme.typography.fontSizeH3};
    font-family: ${({ theme }) => theme.typography.fontFamilyH3};
  }
`;

export const ColorPickersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  input {
    border-radius: 4px;
    padding: 0;
  }
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  label {
    margin-left: 8px;
    font-size: ${({ theme }) => theme.typography.fontSizeBody || '14px'};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const FontRow = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  gap: 16px;
  width: 100%;

  span {
    min-width: 72px;
  }
  button {
    padding: 4px 8px;
    border-radius: 8px;
  }
`;

export const FontDropdownWrapper = styled.div`
  position: relative;

  }

  ul {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    background: ${({ theme }) => theme.colors.backgroundSurface};

    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    list-style: none;
    // padding: 8px 0;
    margin: 0;
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    border-radius: 4px;
    max-height: 30dvh;
    overflow-y: auto;
  }

  li {
    // padding: 8px;
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    cursor: pointer;
    font-family: inherit;

    &:hover {
      background: ${({ theme }) => theme.colors.backgroundHighlight};
    }

    font-family: ${({ fontFamily }) => fontFamily};
  }
`;
export const FontSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  // justify-content: space-between;

  text-align: center;
  min-width: 64px;
  span {
    min-width: 32px;
  }
`;
