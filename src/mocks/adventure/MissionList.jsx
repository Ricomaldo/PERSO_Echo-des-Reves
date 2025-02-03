import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';

function MissionList({ onSelectMission }) {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'missions'));
        const missionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMissions(missionData);
      } catch (e) {
        console.error('Erreur lors de la récupération des missions :', e);
      }
    };

    fetchMissions();
  }, []);

  // Fonction pour supprimer une mission
  const handleDeleteMission = async (missionId) => {
    try {
      const docRef = doc(db, 'missions', missionId); // Référence au document
      await deleteDoc(docRef); // Suppression du document
      setMissions((prev) => prev.filter((mission) => mission.id !== missionId)); // Met à jour la liste localement
      console.log('Mission supprimée avec succès.');
    } catch (e) {
      console.error('Erreur lors de la suppression :', e);
    }
  };

  return (
    <>
      <ul>
        {missions.map((mission) => (
          <li
            key={mission.id}
            // onClick={() => onSelectMission(mission)} // Sélection de la mission
            style={{ cursor: 'pointer', marginBottom: '16px' }}
          >
            <h3>{mission.titre}</h3>
            <p>{mission.description}</p>
            <button onClick={() => onSelectMission(mission)}>Modifier</button>
            <button onClick={() => handleDeleteMission(mission.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default MissionList;
