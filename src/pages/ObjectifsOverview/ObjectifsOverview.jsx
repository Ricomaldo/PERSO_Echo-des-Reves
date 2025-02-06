import { useUser } from '../../utils/contexts/UserProvider';
import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { deleteObjectif } from '../../utils/firebase/firestoreActions';
import { ObjectifCard } from '../../components/ObjectifCard';
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
  const { objectifs, isLoading } = useFirestore();
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
              <Collapse title={`Objectif en cours : ${objectif.titre}`}>
                <ObjectifCard objectif={objectif} showTitle={false} />
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
              </Collapse>{' '}
            </ObjectiveItem>
          ))}
        </ObjectivesList>
      )}

      <Collapse title="Objectifs terminés">
        <ObjectivesList>
          {completedObjectifs
            .slice()
            .sort((a, b) => {
              const dateA = a.deadline
                ? new Date(a.deadline.seconds * 1000)
                : null;
              const dateB = b.deadline
                ? new Date(b.deadline.seconds * 1000)
                : null;

              if (!dateB) return -1; // Les objectifs sans deadline en bas
              if (!dateA) return 1;

              return dateB - dateA; // Tri du plus récent au plus ancien
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
                      : 'Pas de deadline'}{' '}
                    -
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
