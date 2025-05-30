import styled, { css } from 'styled-components';

const sizeVariants = {
  small: css`
    width: 40px;
    height: 40px;
    font-size: ${({ theme }) => theme.typography.fontSizeBody};
    border-width: 2px;
  `,
  large: css`
    width: 120px;
    height: 120px;
    font-size: ${({ theme }) => theme.typography.fontSizeH1};
    border-width: 4px;
  `,
  detailed: css`
    width: 120px;
    height: 120px;
    font-size: ${({ theme }) => theme.typography.fontSizeH2};
    border-width: 4px;
  `,
};

export const ProfilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative; /* ✅ Permet de bien positionner les étoiles et le niveau */

  &:hover {
    transform: scale(1.05);
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  object-fit: cover;
  border-style: solid;
  ${({ $size, $isActive, theme }) => css`
    border-color: ${$isActive ? theme.colors.accent : theme.colors.linkPrimary};
    ${sizeVariants[$size] || sizeVariants.detailed};
    // Appliquer le flou uniquement si l'utilisateur est inactif ET si la taille est "small"
    -webkit-filter: ${!$isActive && $size === 'small' ? 'blur(1px)' : 'none'};
    filter: ${!$isActive && $size === 'small' ? 'blur(1px)' : 'none'};
  `}
  transition: border-color 0.2s ease;

  ${ProfilWrapper}:hover & {
    border-color: ${({ theme }) => theme.colors.linkHover};
  }

  ${ProfilWrapper}:active & {
    border-color: ${({ theme }) => theme.colors.linkActive};
  }
`;

export const UserName = styled.h1`
  color: ${({ theme }) => theme.colors.linkPrimary};
  font-family: ${({ theme }) => theme.typography.fontFamilyH1};
  text-align: center;
  transition: color 0.2s ease;

  ${({ $size }) => sizeVariants[$size] || sizeVariants.detailed};

  ${ProfilWrapper}:hover & {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  ${ProfilWrapper}:active & {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`;

export const StarArc = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: -10px; /* ✅ Ajuster la position pour l'arc */
  width: 100%;
  gap: 4px;

  .fa-star {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.accent};
  }

  .empty {
    color: ${({ theme }) => theme.colors.borderBase};
  }
`;

export const LevelBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  background: ${({ theme }) => theme.colors.backgroundSurface};
  color: ${({ theme }) => theme.colors.accent};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: bold;
  width: 16px;
  height: 16px;
  position: absolute;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
  top: 32px;
`;
