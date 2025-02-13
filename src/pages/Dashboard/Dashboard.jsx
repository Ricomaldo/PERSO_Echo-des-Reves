import { useState } from 'react';

import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { Collapse } from '../../components/Collapse';
import { PageTitle } from '../../layout';
import { ObjectivesList } from './dashboardStyles';
import { ObjectifCard } from '../../components/ObjectifCard';
import { SessionCard } from '../../components/SessionCard';
function Dashboard() {
  const { objectifs, sessions, isLoading } = useFirestore();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const inProgressObjectifs = objectifs.filter(
    (obj) => Number(obj.progression) < 100
  );

  return (
    <>
      <PageTitle title="Tableau de bord" />

      <Collapse title="Objectifs en cours">
        {isLoading ? (
          <p>Chargement des objectifs...</p>
        ) : inProgressObjectifs.length === 0 ? (
          <p>Aucun objectif en cours.</p>
        ) : (
          <ObjectivesList>
            {inProgressObjectifs.map((objectif) => {
              if (!objectif.id) {
                console.error('⚠️ Objectif avec ID manquant:', objectif);
                return null;
              }
              return (
                <ObjectifCard
                  key={objectif.id}
                  objectif={objectif}
                  showDescription={false}
                />
              );
            })}
          </ObjectivesList>
        )}
      </Collapse>

      <Collapse title="Notes de la dernière session">
        {sessions.length === 0 ? (
          <p>Aucune session récente trouvée.</p>
        ) : (
          <SessionCard session={sessions[currentSessionIndex]} />
        )}
      </Collapse>
    </>
  );
}

export default Dashboard;
