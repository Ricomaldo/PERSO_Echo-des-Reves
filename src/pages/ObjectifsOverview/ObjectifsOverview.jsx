import React from 'react';
import { useUser } from '../../utils/contexts/UserProvider';
import { useFirestore } from '../../utils/contexts/FirestoreProvider';
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
import { formatDate } from '../../utils/dateUtils';
function ObjectifsOverview() {
  const { activeUser } = useUser();
  const { objectifs, deleteObjectif, isLoading } = useFirestore();
  const navigate = useNavigate();

  const inProgressObjectifs = objectifs.filter((obj) => obj.progression < 100);
  const completedObjectifs = objectifs.filter((obj) => obj.progression === 100);

  const handleSelectObjectif = (objectif) => {
    navigate(`/objectif/${objectif.id}`);
  };

  return (
    <>
      <PageTitle title="Mes objectifs détaillés" />
      {isLoading ? (
        <p>Chargement des objectifs...</p>
      ) : inProgressObjectifs.length === 0 ? (
        <p>
          Aucun objectif en cours pour {activeUser?.name || 'cet utilisateur'}.
        </p>
      ) : (
        <ObjectivesList>
          {inProgressObjectifs.map((objectif) => (
            <ObjectiveItem key={objectif.id}>
              <Collapse title={objectif.titre}>
                <ObjectiveDescription>
                  {objectif.description}
                </ObjectiveDescription>
                <ProgressBar
                  objectifId={objectif.id}
                  progression={objectif.progression}
                />
                <DeadlineText>
                  {objectif.deadline
                    ? `Échéance: ${formatDate(objectif.deadline)}`
                    : 'Pas de deadline'}
                </DeadlineText>
                <ButtonWrapper>
                  <Button
                    $variant="delete"
                    onClick={() => deleteObjectif(objectif.id)}
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
              {objectif.deadline
                ? formatDate(objectif.deadline)
                : 'Pas de deadline'}
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
