import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';
import { useState, useEffect, useCallback } from 'react';
import { Slider } from './progressBarStyles';
import { debounce } from 'lodash';

const ProgressBar = ({ objectifId, progression, onProgressionChange }) => {
  const [localProgression, setLocalProgression] = useState(progression);

  useEffect(() => {
    setLocalProgression(progression);
  }, [progression]);

  const updateFirestore = useCallback(
    debounce(async (objectifId, newProgression) => {
      try {
        const objectifDocRef = doc(db, 'Objectifs', objectifId);
        await updateDoc(objectifDocRef, { progression: newProgression });
        console.log(`Mise à jour Firestore : ${newProgression}%`);
      } catch (e) {
        console.error(`Erreur mise à jour objectif ${objectifId} :`, e);
      }
    }, 500), // Déclenche après 500ms sans nouvelle interaction
    []
  );

  const handleChange = (event) => {
    const newProgression = parseInt(event.target.value, 10);
    setLocalProgression(newProgression);
    updateFirestore(objectifId, newProgression);
    onProgressionChange(objectifId, newProgression);
  };

  return (
    <Slider
      type="range"
      value={localProgression}
      min={0}
      max={100}
      $completed={localProgression >= 100}
      onChange={handleChange}
      aria-label={`Progression de l'objectif ${objectifId}: ${localProgression}%`}
    />
  );
};

export default ProgressBar;
