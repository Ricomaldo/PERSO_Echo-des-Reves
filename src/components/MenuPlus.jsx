import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import RocketIcon from '@assets/icons/rocket.svg?react';
import Notebook from '@assets/icons/notebook-pen.svg?react';
import { v4 as uuidv4 } from 'uuid';

const MenuPlusContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '128px' : '0px')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: height 0.3s ease, opacity 0.3s ease;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  border-radius: 16px 16px 0 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderNeutral};
  z-index: 100;
`;

const MenuPlusLinkContainer = styled.div`
  display: flex;
  gap: 80px;
`;

const MenuPlusLink = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border-radius: 25%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
`;

const MenuPlusIcon = styled.div`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  padding: 0 8px;
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CancelLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  margin-top: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    color: ${({ theme }) => theme.colors.interaction};
  }
`;

const MenuPlus = ({ isOpen, closeMenu }) => {
  const [isVisible, setIsVisible] = useState(false); // Contrôle la visibilité
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Pour navigation dynamique

  // Met à jour la visibilité en fonction de `isOpen`
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Rendre visible immédiatement à l'ouverture
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false); // Cache après l'animation
      }, 300); // Durée identique à la transition
      return () => clearTimeout(timer); // Nettoyer si le composant se démonte
    }
  }, [isOpen]);

  // Ferme le menu si un clic est fait à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // Actions pour chaque bouton
  const generateAndNavigate = (path) => {
    const newId = uuidv4(); // Utilisation d'UUID
    navigate(`${path}/${newId}`);
    closeMenu();
  };

  const actions = [
    {
      name: 'rocket',
      icon: RocketIcon,
      action: () => generateAndNavigate('/objectif'), // Utilise la fonction utilitaire
    },
    {
      name: 'notebook',
      icon: Notebook,
      action: () => generateAndNavigate('/session'), // Utilise la fonction utilitaire
    },
  ];

  return (
    <MenuPlusContainer ref={menuRef} $isOpen={isOpen} $isVisible={isVisible}>
      <Text>Créer</Text>
      <MenuPlusLinkContainer>
        {actions.map((item) => (
          <MenuPlusLink
            key={item.name}
            onClick={item.action} // Exécute l'action associée
          >
            <MenuPlusIcon>
              <item.icon />
            </MenuPlusIcon>
          </MenuPlusLink>
        ))}
      </MenuPlusLinkContainer>
      <CancelLink
        to="/dashboard"
        onClick={() => {
          closeMenu();
        }}
      >
        Annuler
      </CancelLink>
    </MenuPlusContainer>
  );
};

export default MenuPlus;
