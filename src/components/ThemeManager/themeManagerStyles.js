import styled from 'styled-components';

export const ThemeManagerWrapper = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  border-radius: 8px;
  width: 100%;
  margin: 0 auto;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 12px;
`;
export const ColorPickersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px; /* Espace entre les pickers */
  margin-top: 24px;
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  span {
    margin-left: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ColorBox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
`;

export const FontRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const FontDropdownWrapper = styled.div`
  position: relative;
  width: 180px;
  overflow-y: auto;
  button {
    width: 100%;
    padding: 8px;
    background: ${({ theme }) => theme.colors.backgroundSurface};
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    border-radius: 4px;
    font-family: ${({ theme }) => theme.typography.fontFamilyNeutral};
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    text-align: left;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.backgroundHighlight};
    }
  }

  ul {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.backgroundSurface};
    list-style: none;
    padding: 8px 0;
    margin: 0;
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    border-radius: 4px;
  }

  li {
    padding: 8px;
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.backgroundHighlight};
    }

    font-family: ${({ fontFamily }) => fontFamily};
  }
`;

export const FontSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    padding: 4px 8px;
    background: ${({ theme }) =>
      theme.colors.secondary}; /* ✅ Couleur de fond secondaire */
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    border-radius: 4px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textPrimary}; /* Texte lisible */

    &:hover {
      background: ${({ theme }) =>
        theme.colors.accent}; /* Changement au survol */
    }
  }
`;
