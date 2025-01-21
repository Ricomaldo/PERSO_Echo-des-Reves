import { Component, useContext, useState } from 'react';
import { UserContext } from '../utils/contexts/UserContext';
// import '../styles/components/_collapsibleSection.scss';

const CollapsibleSection = ({ title, content }) => {
  const { userState } = useContext(UserContext); // Récupérer le contexte utilisateur
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapse ${isOpen ? 'collapse--open' : ''}`}>
      <div className="collapse__title" onClick={handleToggle}>
        <h2>{title}</h2>
        <i
          className={`fa fa-chevron-down collapse__icon ${
            isOpen ? 'collapse__icon--rotated' : ''
          }`}
        ></i>
      </div>
      {isOpen && <div className="collapse__content">{content}</div>}
    </div>
  );
};

export default CollapsibleSection;

// à integrer en styled-Component :
// .collapse {
//   width: 100%;
//   border-radius: 5px;
//   overflow: hidden;
//   transition: background-color 0.3s ease, color 0.3s ease;

//   .collapse__title {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 10px 15px;
//     cursor: pointer;
//     background-color: var(--theme-bg); // Couleur dynamique
//     color: var(--theme-text);
//     border: 1px solid var(--theme-border);

//     &:hover {
//       /* Appliquer une transparence pour l'effet hover */
//       filter: brightness(1.1); // Augmente la luminosité
//     }
//   }

//   .collapse__content {
//     padding: 15px;
//     font-size: 16px;
//     line-height: 1.5;
//     background-color: var(--theme-bg);
//     color: var(--theme-text);
//     border-top: 1px solid var(--theme-border);
//   }
// }
