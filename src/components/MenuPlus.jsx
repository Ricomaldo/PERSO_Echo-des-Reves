import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MenuPlusContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '128px' : '0px')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: height 0.3s ease, opacity 0.3s ease;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  border-radius: 16px 16px 0 0;
  background-color: var(--bg-dark-color);
  border: 1px solid var(--border-neutral-color);
  z-index: 100;
`;

const MenuPlus = ({ isOpen, closeMenu }) => {
  const menuRef = useRef(null);

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

  return (
    <MenuPlusContainer ref={menuRef} $isOpen={isOpen}>
      <ul>
        <li>
          <a href="/option1">Option 1</a>
        </li>
        <li>
          <a href="/option2">Option 2</a>
        </li>
        <li>
          <a href="/option3">Option 3</a>
        </li>
      </ul>
    </MenuPlusContainer>
  );
};

export default MenuPlus;
