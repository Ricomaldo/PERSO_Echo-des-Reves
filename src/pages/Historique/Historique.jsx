import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { Collapse } from '../../components/Collapse';
import { Button, ButtonGroup } from '../../components/Button';
import { Calendrier } from '../../components/Calendrier';
import { PageTitle } from '../../layout';
import { NavigationArrows } from '../../components/NavigationArrows';

import { formatDate } from '../../utils/dateUtils';

const Historique = () => {
  const { sessions, isLoading } = useFirestore();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const navigate = useNavigate();

  const currentSession = useMemo(
    () => (sessions.length > 0 ? sessions[currentSessionIndex] : null),
    [sessions, currentSessionIndex]
  );

  const sessionDate = useMemo(
    () => formatDate(currentSession?.date),
    [currentSession]
  );

  const handleSessionNavigation = (direction) => {
    if (sessions.length === 0) return;

    setCurrentSessionIndex((prevIndex) => {
      if (direction === 'prev' && prevIndex < sessions.length - 1) {
        return prevIndex + 1;
      }
      if (direction === 'next' && prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleSelectSession = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  return (
    <>
      <PageTitle title="Historique" />

      <Collapse title="Calendrier" defaultOpen={false}>
        <Calendrier sessions={sessions} />
      </Collapse>

      <Collapse
        title={`Session du ${
          currentSession ? sessionDate : 'Aucune session récente'
        }`}
      >
        {isLoading ? (
          <p>Chargement des sessions...</p>
        ) : sessions.length === 0 ? (
          <p>Aucune session trouvée.</p>
        ) : (
          <>
            {currentSession ? (
              <>
                {/* 🔄 Navigation entre sessions */}
                <NavigationArrows
                  onPrev={() => handleSessionNavigation('prev')}
                  onNext={() => handleSessionNavigation('next')}
                  canGoPrev={currentSessionIndex < sessions.length - 1}
                  canGoNext={currentSessionIndex > 0}
                />

                {/* 📄 Détails de la session */}
                <p>
                  Notes : {currentSession.notes || 'Aucune note disponible'}
                </p>
                {currentSession.vigilance && (
                  <p>Vigilance : {currentSession.vigilance}</p>
                )}

                {/* 🎯 Bouton Modifier */}
                <ButtonGroup $align="center">
                  <Button
                    $variant="primary"
                    onClick={() => handleSelectSession(currentSession.id)}
                  >
                    Modifier
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <p>Session introuvable.</p>
            )}
          </>
        )}
      </Collapse>
    </>
  );
};

export default Historique;
