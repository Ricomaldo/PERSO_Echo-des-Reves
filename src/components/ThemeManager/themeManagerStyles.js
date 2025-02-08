import styled from 'styled-components';

// 🧩 Wrapper principal
export const ThemeManagerWrapper = styled.div`
  padding: 4px;
  border-radius: 8px;
  width: 100%;
`;

export const Section = styled.div`
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSizeNeutral};
  select {
    padding: 8px;
    border-radius: 16px;
    font-family: ${({ theme }) => theme.typography.fontFamilyBody};
  }
`;

export const ColorPickersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* ✅ Deux colonnes */
  gap: 8px; /* ✅ Ajout d'espace entre les éléments */
  margin-top: 24px;
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSurface};
  padding: 4px;
  border-radius: 8px;
  label {
    margin-left: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const FontRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-botom: 1px solid ${({ theme }) => theme.colors.borderBase};
  border-radius: 8px;
  span {
    min-width: 20%;
  }
  // background-color: ${({ theme }) => theme.colors.backgroundSurface};
`;

export const FontDropdownWrapper = styled.div`
  position: relative;
  // overflow-y: scroll;

  button {
    width: 120px;
    background: ${({ theme }) => theme.colors.backgroundSurface};
    border-radius: 8px;

    font-family: inherit; /* Hérite de la police sélectionnée */
    font-size: inherit; /* Hérite de la taille */
    text-align: center;
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
    max-height: 30dvh;
    overflow-y: auto;
  }

  li {
    padding: 8px;
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
  justify-content: space-around;
  gap: 4px;

  button {
    padding: 4px 8px;
    background: ${({ theme }) => theme.colors.linkPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderBase};
    border-radius: 4px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover {
      background: ${({ theme }) => theme.colors.linkHover};
    }
  }
`;
