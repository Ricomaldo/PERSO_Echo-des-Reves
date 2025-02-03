import React, { useEffect, useState } from 'react';

import { useUser } from '../../utils/contexts/UserProvider';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';
import { ProgressBar } from '../../components/ProgressBar';
import { Collapse } from '../../components/Collapse';
import { Button } from '../../components/Button';
import { PageTitle } from '../../layout';
import { useNavigate } from 'react-router-dom';
import {
  ObjectivesList,
  ObjectiveItem,
  ObjectiveDescription,
  DeadlineText,
  CompletedObjectiveItem,
  ButtonWrapper,
} from './objectifsOverviewStyles';

function ObjectifsOverview() {
  const [objectifs, setObjectifs] = useState([]);
  const [completedObjectifs, setCompletedObjectifs] = useState([]);
  const { activeUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchObjectifs = async () => {
      try {
        setIsLoading(true);
        if (!activeUser || !activeUser.name) {
          console.log('Utilisateur actif non défini ou sans nom.');
          setIsLoading(false);
          return;
        }

        const objectifsCollectionRef = collection(db, 'Objectifs');

        const queryInProgress = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '<', 100)
        );

        const queryCompleted = query(
          objectifsCollectionRef,
          where('participant', '==', activeUser.name),
          where('progression', '==', 100)
        );

        const [inProgressSnapshot, completedSnapshot] = await Promise.all([
          getDocs(queryInProgress),
          getDocs(queryCompleted),
        ]);

        const inProgressObjectifs = inProgressSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const completedObjectifs = completedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setObjectifs(inProgressObjectifs);
        setCompletedObjectifs(completedObjectifs);
      } catch (e) {
        console.error('Erreur lors de la récupération des objectifs :', e);
      } finally {
        setIsLoading(false);
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

  const navigate = useNavigate();

  const handleSelectObjectif = (objectif) => {
    navigate(`/objectif/${objectif.id}`);
  };

  const handleDeleteObjectif = async (objectifId) => {
    try {
      const objectifRef = doc(db, 'Objectifs', objectifId);
      await deleteDoc(objectifRef);

      setObjectifs((prevObjectifs) =>
        prevObjectifs.filter((objectif) => objectif.id !== objectifId)
      );

      console.log('Objectif supprimé avec succès.');
    } catch (e) {
      console.error('Erreur lors de la suppression :', e);
    }
  };

  return (
    <>
      <PageTitle title="Mes objectifs détaillés" />
      {isLoading ? (
        <p>Chargement des objectifs...</p>
      ) : objectifs.length === 0 ? (
        <p>
          Aucun objectif en cours pour {activeUser?.name || 'cet utilisateur'}.
        </p>
      ) : (
        <ObjectivesList>
          {objectifs.map((objectif) => (
            <ObjectiveItem key={objectif.id}>
              <Collapse title={objectif.titre}>
                <ObjectiveDescription>
                  {objectif.description}
                </ObjectiveDescription>
                <ProgressBar
                  objectifId={objectif.id}
                  progression={objectif.progression}
                  onProgressionChange={handleProgressionChange}
                />
                <DeadlineText>
                  {objectif.deadline
                    ? `Échéance: ${new Date(
                        objectif.deadline.seconds * 1000
                      ).toLocaleDateString('fr-FR', {
                        month: 'short',
                        year: 'numeric',
                      })}`
                    : 'Pas de deadline'}
                </DeadlineText>
                <ButtonWrapper>
                  <Button
                    $variant="delete"
                    onClick={() => handleDeleteObjectif(objectif.id)}
                  >
                    Supprimer
                  </Button>
                  <Button
                    $variant="primary"
                    onClick={() => handleSelectObjectif(objectif)}
                  >
                    Modifier
                  </Button>
                </ButtonWrapper>
              </Collapse>
            </ObjectiveItem>
          ))}
        </ObjectivesList>
      )}

      <Collapse title="Objectifs terminés">
        <ObjectivesList>
          {completedObjectifs.map((objectif) => (
            <CompletedObjectiveItem
              key={objectif.id}
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
            </CompletedObjectiveItem>
          ))}
        </ObjectivesList>
        <p>
          {completedObjectifs.length} objectifs ont été atteints par{' '}
          {activeUser?.name || 'cet utilisateur'}.
        </p>
      </Collapse>
    </>
  );
}

export default ObjectifsOverview;
