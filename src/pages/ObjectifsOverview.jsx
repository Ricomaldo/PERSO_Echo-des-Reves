import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/contexts/UserProvider';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import ProgressBar from '../components/ProgressBar';
import Collapse from '../components/Collapse';
import { useNavigate } from 'react-router-dom';

function ObjectifsOverview() {
  const [objectifs, setObjectifs] = useState([]);
  const { activeUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchObjectifs = async () => {
      try {
        setIsLoading(true); // Indique que le chargement commence
        if (!activeUser || !activeUser.name) {
          console.log('Utilisateur actif non défini ou sans nom.');
          setIsLoading(false); // Arrête le chargement si pas d'utilisateur
          return;
        }

        const objectifsCollectionRef = collection(db, 'Objectifs');
        const queryRef = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '<', 100)
        );
        const querySnapshot = await getDocs(queryRef);

        if (querySnapshot.empty) {
          setObjectifs([]);
          console.log(`Aucun objectif en cours pour ${activeUser.name}.`);
        } else {
          const objectifs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setObjectifs(objectifs);
        }
      } catch (e) {
        console.error('Erreur lors de la récupération des objectifs :', e);
      } finally {
        setIsLoading(false); // Indique que le chargement est terminé
      }
    };

    fetchObjectifs();
  }, [activeUser]);

  const handleProgressionChange = (objectifId, newProgression) => {
    setObjectifs((prevObjectifs) =>
      prevObjectifs.map((objectif) =>
        objectif.id === objectifId
          ? { ...objectif, progression: newProgression }
          : objectif
      )
    );
  };
  const navigate = useNavigate(); // Initialiser le hook pour naviguer

  const handleSelectObjectif = (objectif) => {
    navigate(`/objectif/${objectif.id}`); // Naviguer vers la route avec l'ID de l'objectif
  };
  return (
    <>
      {isLoading ? (
        <p>Chargement des objectifs...</p>
      ) : objectifs.length === 0 ? (
        <p>
          Aucun objectif en cours pour {activeUser?.name || 'cet utilisateur'}.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {objectifs.map((objectif) => (
            <li
              key={objectif.id}
              style={{ marginBottom: '16px', listStyleType: 'none' }}
            >
              {/* Collapse par objectif */}
              <Collapse title={objectif.titre}>
                <p style={{ marginBottom: '8px', textAlign: 'left' }}>
                  {objectif.description}
                </p>
                <ProgressBar
                  objectifId={objectif.id} // Passe l'id de l'objectif
                  progression={objectif.progression} // Passe la progression actuelle
                  onProgressionChange={handleProgressionChange} // Passe la fonction de mise à jour
                />
                <p
                  style={{
                    fontSize: '0.9em',
                    color: '#555',
                    marginBottom: '16px',
                  }}
                >
                  Échéance :{' '}
                  {new Date(
                    objectif.deadline.seconds * 1000
                  ).toLocaleDateString('fr-FR', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <button
                  style={{
                    background: '#017374',
                    color: '#fff',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={() => handleSelectObjectif(objectif)}
                >
                  Modifier
                </button>
              </Collapse>
            </li>
          ))}
        </ul>
      )}

      <Collapse title="Dernière session">
        <p>Lorem Elsass ipsum Spätzle rucksack et bredele</p>
      </Collapse>
    </>
  );
}

export default ObjectifsOverview;
