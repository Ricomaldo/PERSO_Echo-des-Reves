import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const CollapseContainer = styled.div`
  width: 100%;
`;

const CollapseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  height: 40px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px 8px 0 0;
  border: solid 2px ${({ theme }) => theme.colors.borderNeutral};
  &:hover {
    filter: brightness(1.1);
  }
`;

const CollapseContent = styled.div`
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: max-height 0.4s ease, opacity 0.3s ease;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border-radius: 0 0 8px 8px;
  border: solid 2px ${({ theme }) => theme.colors.borderNeutral};
  border-top: none;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
`;

const CollapseText = styled.div`
  padding: ${({ $isOpen }) => ($isOpen ? '8px' : '0 8px')};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const ArrowIcon = styled.i`
  transition: transform 0.4s ease-in-out;
  transform-origin: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};
`;

const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [maxHeight, setMaxHeight] = useState(0); // Stocke la hauteur dynamique
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight); // Recalcule la hauteur si ouvert
    } else {
      setMaxHeight(0); // Réinitialise à 0 si fermé
    }
  }, [isOpen, children]); // Recalcule aussi si `children` change

  const ToggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CollapseContainer>
      <CollapseHeader onClick={ToggleCollapse} $isOpen={isOpen}>
        <h2>{title}</h2>
        <ArrowIcon $isOpen={isOpen} className="fa fa-chevron-down"></ArrowIcon>
      </CollapseHeader>

      <CollapseContent
        ref={contentRef}
        $isOpen={isOpen}
        $maxHeight={maxHeight} // Hauteur dynamique
      >
        <CollapseText $isOpen={isOpen}>{children}</CollapseText>
      </CollapseContent>
    </CollapseContainer>
  );
};

export default Collapse;
