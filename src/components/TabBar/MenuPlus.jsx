import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  MenuPlusContainer,
  MenuPlusLinkContainer,
  MenuPlusLink,
  Text,
  CancelLink,
} from './menuPlusStyles';
import { TabBarIcon } from './tabBarStyles';
import { menuPlusItems } from './menuPlusConfig';
import { v4 as uuidv4 } from 'uuid';

const MenuPlus = ({ isOpen, closeMenu }) => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleNavigation = (path) => {
    navigate(`${path}/${uuidv4()}`);
    closeMenu();
  };

  return (
    <MenuPlusContainer ref={menuRef} $isOpen={isOpen} $isVisible={isVisible}>
      <Text>Créer</Text>
      <MenuPlusLinkContainer>
        {menuPlusItems.map((item) => (
          <MenuPlusLink
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            aria-label={`Créer un ${item.name}`}
          >
            <TabBarIcon $isActive={false}>
              <item.icon />
            </TabBarIcon>
          </MenuPlusLink>
        ))}
      </MenuPlusLinkContainer>
      <CancelLink to="/dashboard" onClick={closeMenu}>
        Annuler
      </CancelLink>
    </MenuPlusContainer>
  );
};

export default MenuPlus;
