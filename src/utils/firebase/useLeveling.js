import { useUser } from '../contexts/UserProvider';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Gère les étoiles et le niveau en fonction des objectifs complétés.
 * @param {Array} objectifs - Liste des objectifs de l'utilisateur
 */
export const useLeveling = (objectifs) => {
  const { activeUser } = useUser();
  const storedLevel = Number(localStorage.getItem('currentLevel')) || 1; // 🔹 Charge le niveau enregistré
  const [currentLevel, setCurrentLevel] = useState(storedLevel);
  const [currentStars, setCurrentStars] = useState(0);

  useEffect(() => {
    const storedCompleted =
      JSON.parse(localStorage.getItem('completedObjectives')) || [];

    let completedStars = 0;
    let newCompletedObjectives = [...storedCompleted];
    let hasNewCompletion = false;
    if (!Array.isArray(objectifs) || objectifs.length === 0) return;

    objectifs.forEach((obj) => {
      if (obj.progression === 100) {
        completedStars += Number(obj.etoiles || 0);

        // 🚀 Vérifie si l'objectif vient juste d'être complété
        if (!storedCompleted.includes(obj.id)) {
          newCompletedObjectives.push(obj.id); // ✅ Ajoute à la liste
          hasNewCompletion = true;
          toast.success(
            `🚀 Objectif "${obj.titre}" complété ! Bravo ${activeUser.name} !`,
            { icon: '🌟' }
          );
        }
      }
    });

    // 🏆 Calcul du nouveau niveau
    const newLevel = Math.floor(completedStars / 4) + 1;
    const newStars = completedStars % 4;

    // 💾 Mise à jour du `localStorage` pour éviter les répétitions
    if (newCompletedObjectives.length !== storedCompleted.length) {
      localStorage.setItem(
        'completedObjectives',
        JSON.stringify(newCompletedObjectives)
      );
    }

    if (newLevel > storedLevel) {
      toast.success(
        `🏆 Niveau ${newLevel} débloqué ! Félicitations ${activeUser.name} !`,
        { icon: '🌟' }
      );
      localStorage.setItem('currentLevel', newLevel); // 🔹 Stocke le niveau dans `localStorage`
    }

    // ✅ Mise à jour du state
    setCurrentLevel(newLevel);
    setCurrentStars(newStars);
  }, [objectifs, activeUser.name]); // ✅ Supprimé `currentLevel` des dépendances pour éviter le re-déclenchement en boucle

  return { currentLevel, currentStars };
};
