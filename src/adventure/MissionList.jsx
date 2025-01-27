import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

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

  return (
    <>
      <ul>
        {missions.map((mission) => (
          <li
            key={mission.id}
            onClick={() => onSelectMission(mission)} // Sélection de la mission
            style={{ cursor: 'pointer', marginBottom: '16px' }}
          >
            <h3>{mission.titre}</h3>
            <p>{mission.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
export default MissionList;