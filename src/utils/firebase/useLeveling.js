import { useUser } from '../contexts/UserProvider';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Gère les étoiles et le niveau en fonction des objectifs complétés.
 * @param {Array} objectifs - Liste des objectifs de l'utilisateur
 * @param {String} userName - Nom d'utilisateur pour isoler les données
 */
export const useLeveling = (objectifs, userName) => {
  const { activeUser } = useUser();
  const storedLevel = Number(localStorage.getItem(`${userName}_currentLevel`)) || 1; // 🔹 Charge le niveau enregistré
  const [currentLevel, setCurrentLevel] = useState(storedLevel);
  const [currentStars, setCurrentStars] = useState(0);

  useEffect(() => {
    if (!userName) return;

    const storedCompleted =
      JSON.parse(localStorage.getItem(`${userName}_completedObjectives`)) || [];
    const isFirstLoad = !localStorage.getItem(`${userName}_firstLoad`);

    let completedStars = 0;
    let newCompletedObjectives = [...storedCompleted];
    if (!Array.isArray(objectifs) || objectifs.length === 0) return;

    objectifs.forEach((obj) => {
      if (obj.progression === 100) {
        completedStars += Number(obj.etoiles || 0);

        // 🚀 Vérifie si l'objectif vient juste d'être complété
        if (!storedCompleted.includes(obj.id)) {
          newCompletedObjectives.push(obj.id);

          // Affiche le toast seulement si ce n'est pas le premier chargement
          if (!isFirstLoad) {
            toast.success(
              `🚀 Objectif "${obj.titre}" complété ! Bravo ${activeUser.name} !`,
              { icon: '🌟' }
            );
          }
        }
      }
    });

    // 🏆 Calcul du nouveau niveau
    const newLevel = Math.floor(completedStars / 4) + 1;
    const newStars = completedStars % 4;

    // 💾 Mise à jour du `localStorage` pour éviter les répétitions
    if (newCompletedObjectives.length !== storedCompleted.length) {
      localStorage.setItem(
        `${userName}_completedObjectives`,
        JSON.stringify(newCompletedObjectives)
      );
    }

    if (newLevel > storedLevel) {
      // Toast seulement si ce n'est pas le premier chargement
      if (!isFirstLoad) {
        toast.success(
          `🏆 Niveau ${newLevel} débloqué ! Félicitations ${activeUser.name} !`,
          { icon: '🌟' }
        );
      }
      localStorage.setItem(`${userName}_currentLevel`, newLevel);
    }

    // Marquer la première charge comme complétée
    if (isFirstLoad) {
      localStorage.setItem(`${userName}_firstLoad`, 'true');
    }

    // ✅ Mise à jour du state
    setCurrentLevel(newLevel);
    setCurrentStars(newStars);
  }, [objectifs, activeUser.name, userName]);

  return { currentLevel, currentStars };
};
