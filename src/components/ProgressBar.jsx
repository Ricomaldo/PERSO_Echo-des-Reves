import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import styled from 'styled-components';

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none; /* Désactive le style natif WebKit */
  appearance: none;
  height: 8px;
  background: ${(props) =>
    props.$completed
      ? props.theme.colors.highlight // Barre complétée
      : props.theme.colors.interaction}; // Barre de fond
  outline: none; /* Supprime le contour bleu natif */
  opacity: 0.7;
  transition: opacity 0.2s, background-color 0.3s ease;

  &:hover {
    opacity: 1;
  }

  /* Personnalisation du curseur */
  &::-webkit-slider-thumb {
    width: 8px;
    height: 24px;
    background: ${({ theme }) =>
      theme.colors.highlight}; /* Jaune pour la progression */
    cursor: pointer;

    transition: background 0.3s ease;
    -webkit-appearance: none; /* Supprime les styles natifs de WebKit */
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.primary}; /* Couleur jaune */
    cursor: pointer;
    border-radius: 50%; /* Forme circulaire */
    border: 2px solid ${({ theme }) => theme.colors.borderNeutral}; /* Bordure */
    transition: background 0.3s ease;
  }

  /* Style de focus pour le curseur */
  &::-webkit-slider-thumb:focus {
    background: ${({ theme }) => theme.colors.highlight}; /* Jaune pour focus */
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.highlight}; /* Effet visuel doux */
  }

  &::-moz-range-thumb:focus {
    background: ${({ theme }) => theme.colors.highlight}; /* Jaune pour focus */
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.highlight}; /* Effet visuel doux */
  }
`;

const ProgressBar = ({ objectifId, progression, onProgressionChange }) => {
  // Fonction pour gérer le changement de valeur
  const handleChange = async (event) => {
    const newProgression = parseInt(event.target.value, 10);

    try {
      // Référence au document Firestore
      const objectifDocRef = doc(db, 'Objectifs', objectifId);

      // Mise à jour de la progression
      await updateDoc(objectifDocRef, {
        progression: newProgression,
      });

      console.log(
        `Progression mise à jour pour l'objectif ${objectifId} : ${newProgression}%`
      );
      // Notifie le parent du changement
      onProgressionChange(objectifId, newProgression);
    } catch (e) {
      console.error(
        `Erreur lors de la mise à jour de la progression pour l'objectif ${objectifId} :`,
        e
      );
    }
  };

  return (
    <Slider
      type="range" // Défini explicitement ici
      value={progression}
      min={0}
      max={100}
      $completed={progression >= 100}
      onChange={handleChange}
    />
  );
};
export default ProgressBar;
