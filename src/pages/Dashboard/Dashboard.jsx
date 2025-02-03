import React, { useState } from 'react';
import { useUser } from '../../utils/contexts/UserProvider';
import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { Collapse } from '../../components/Collapse';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../layout';
import { ObjectivesList } from './dashboardStyles';
import { formatDate } from '../../utils/dateUtils';
import { ObjectifCard } from '../../components/ObjectifCard';
import { SessionCard } from '../../components/SessionCard';

function Dashboard() {
  const { activeUser } = useUser();
  const { objectifs, sessions, isLoading, saveObjectif } = useFirestore();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const inProgressObjectifs = objectifs.filter(
    (obj) => Number(obj.progression) < 100
  );
  const sessionDate = formatDate(sessions[currentSessionIndex]?.date);

  const handleProgressionChange = (objectifId, newProgression) => {
    const objectifToUpdate = objectifs.find((obj) => obj.id === objectifId);
    if (objectifToUpdate) {
      saveObjectif(
        { ...objectifToUpdate, progression: newProgression },
        objectifId
      );
    }
  };

  return (
    <>
      <PageTitle title="Tableau de bord" />

      <Collapse title={`Objectifs pour ${activeUser?.name || ''}`}>
        {isLoading ? (
          <p>Chargement des objectifs...</p>
        ) : inProgressObjectifs.length === 0 ? (
          <p>
            Aucun objectif en cours pour {activeUser?.name || 'cet utilisateur'}
            .
          </p>
        ) : (
          <ObjectivesList>
            {inProgressObjectifs.map((objectif) => (
              <ObjectifCard
                key={objectif.id}
                objectif={objectif}
                onProgressionChange={handleProgressionChange}
              />
            ))}
          </ObjectivesList>
        )}
      </Collapse>

      <Collapse title={`Dernière session de ${activeUser?.name || ''}`}>
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
