import React from 'react';
import { useUser } from '../../utils/contexts/UserProvider';
import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { ProgressBar } from '../../components/ProgressBar';
import { Collapse } from '../../components/Collapse';
import { Button, ButtonGroup } from '../../components/Button';
import { PageTitle } from '../../layout';
import { useNavigate } from 'react-router-dom';
import {
  ObjectivesList,
  ObjectiveItem,
  ObjectiveDescription,
  DeadlineText,
  CompletedObjectiveItem,
  StarDisplay,
  TextAndStars,
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
                <ButtonGroup>
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
                </ButtonGroup>
              </Collapse>
            </ObjectiveItem>
          ))}
        </ObjectivesList>
      )}

      <Collapse title="Objectifs terminés">
        <ObjectivesList>
          {completedObjectifs
            .slice()
            .sort((a, b) => {
              if (!b.deadline) return -1;
              if (!a.deadline) return 1;
              return (
                new Date(b.deadline.seconds * 1000) -
                new Date(a.deadline.seconds * 1000)
              );
            })
            .map((objectif) => (
              <CompletedObjectiveItem
                key={objectif.id}
                onClick={() => handleSelectObjectif(objectif)}
              >
                <TextAndStars>
                  <div>
                    <strong>{objectif.titre}</strong> –{' '}
                    {objectif.deadline
                      ? formatDate(objectif.deadline)
                      : 'Pas de deadline'}
                  </div>
                  <StarDisplay>
                    {[...Array(Number(objectif.etoiles))].map((_, index) => (
                      <i key={index} className="fa fa-star filled" />
                    ))}
                  </StarDisplay>
                </TextAndStars>
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
