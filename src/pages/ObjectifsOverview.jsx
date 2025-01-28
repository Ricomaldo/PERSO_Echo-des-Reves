import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/contexts/UserProvider';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import ProgressBar from '../components/ProgressBar';
import Collapse from '../components/Collapse';
import Button from '../components/Button';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const ButtonWrapper = styled.div`
  margin: auto;
  gap: 8px;
  width: 50%;
`;

function ObjectifsOverview() {
  const [objectifs, setObjectifs] = useState([]); // Objectifs en cours
  const [completedObjectifs, setCompletedObjectifs] = useState([]); // Objectifs terminés
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

        // Requête pour les objectifs en cours (progression < 100)
        const queryInProgress = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '<', 100)
        );

        // Requête pour les objectifs terminés (progression === 100)
        const queryCompleted = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '==', 100)
        );

        // Exécuter les deux requêtes en parallèle
        const [inProgressSnapshot, completedSnapshot] = await Promise.all([
          getDocs(queryInProgress),
          getDocs(queryCompleted),
        ]);

        // Traiter les résultats des objectifs en cours
        const inProgressObjectifs = inProgressSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Traiter les résultats des objectifs terminés
        const completedObjectifs = completedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setObjectifs(inProgressObjectifs);
        setCompletedObjectifs(completedObjectifs);
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

  const handleDeleteObjectif = async (objectifId) => {
    try {
      await deleteDoc(collection(db, 'Objectifs').doc(objectifId)); // Suppression du document
      setObjectifs((prevObjectifs) =>
        prevObjectifs.filter((objectif) => objectif.id !== objectifId)
      ); // Met à jour la liste des objectifs localement
      console.log('Objectif supprimé avec succès.');
    } catch (e) {
      console.error('Erreur lors de la suppression :', e);
    }
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
                <ButtonWrapper>
                  <Button
                    $variant="delete" // Applique la variante 'delete'
                    onClick={() => handleDeleteObjectif(objectif.id)} // Garde le même comportement
                  >
                    Supprimer
                  </Button>{' '}
                  <Button
                    $variant="primary" // Applique la variante 'primary'
                    onClick={() => handleSelectObjectif(objectif)} // Garde le même comportement
                  >
                    Modifier
                  </Button>
                </ButtonWrapper>
              </Collapse>
            </li>
          ))}
        </ul>
      )}

      {/* Collapse des objectifs terminés */}
      <Collapse title={`Objectifs terminés `}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {completedObjectifs.map((objectif) => (
            <li
              key={objectif.id}
              style={{
                marginBottom: '8px',
                padding: '4px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
              onClick={() => handleSelectObjectif(objectif)}
            >
              <strong>{objectif.titre}</strong> –{' '}
              {new Date(objectif.deadline.seconds * 1000).toLocaleDateString(
                'fr-FR',
                {
                  month: 'short',
                  year: 'numeric',
                }
              )}
            </li>
          ))}
        </ul>{' '}
        <p>
          {completedObjectifs.length} objectifs ont été atteints par{' '}
          {activeUser?.name || 'cet utilisateur'}.
        </p>
      </Collapse>
    </>
  );
}

export default ObjectifsOverview;
