import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Gère les étoiles et le niveau en fonction des objectifs complétés.
 * @param {Array} objectifs - Liste des objectifs de l'utilisateur
 */
export const useLeveling = (objectifs) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStars, setCurrentStars] = useState(0);

  useEffect(() => {
    const completedStars = objectifs
      .filter((o) => o.progression === 100)
      .reduce((acc, obj) => acc + Number(obj.etoiles || 0), 0);

    const newLevel = Math.floor(completedStars / 4) + 1;
    const newStars = completedStars % 4;

    if (newLevel > currentLevel)
      toast.success(`🎉 Niveau ${newLevel} débloqué !`);

    setCurrentLevel(newLevel);
    setCurrentStars(newStars);
  }, [objectifs]);

  return { currentLevel, currentStars };
};
