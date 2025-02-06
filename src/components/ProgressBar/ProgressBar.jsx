import { saveObjectif } from '../../utils/firebase/firestoreActions';
import { useState, useEffect, useCallback } from 'react';
import { Slider } from './progressBarStyles';
import { debounce } from 'lodash';

const ProgressBar = ({ objectif }) => {
  // 🚨 Ajout d'une vérification de sécurité
  if (!objectif) {
    console.warn('⚠️ ProgressBar a reçu un objectif undefined.');
    return null; // 🔴 Évite d'afficher un composant vide et générer une erreur
  }

  const [localProgression, setLocalProgression] = useState(
    objectif.progression || 0
  );

  useEffect(() => {
    setLocalProgression(objectif.progression || 0);
  }, [objectif.progression]);

  const saveProgression = useCallback(
    debounce(async (newProgression) => {
      if (!objectif.id) {
        console.error('❌ Aucun ID fourni pour la progression.');
        return;
      }

      await saveObjectif(
        { ...objectif, progression: newProgression },
        objectif.participant
      );
    }, 500),
    [objectif]
  );

  const handleChange = (event) => {
    const newProgression = parseInt(event.target.value, 10);
    setLocalProgression(newProgression);
    saveProgression(newProgression);
  };

  return (
    <Slider
      type="range"
      value={localProgression}
      min={0}
      max={100}
      $completed={localProgression >= 100}
      onChange={handleChange}
      aria-label={`Progression de l'objectif ${objectif.id}: ${localProgression}%`}
    />
  );
};

export default ProgressBar;
