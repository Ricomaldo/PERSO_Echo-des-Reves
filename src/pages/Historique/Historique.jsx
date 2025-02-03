import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import 'react-calendar/dist/Calendar.css';
import { useUser } from '../../utils/contexts/UserProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';
import { Collapse } from '../../components/Collapse';
import { Button } from '../../components/Button';
import { Calendrier } from '../../components/Calendrier';
import { PageTitle } from '../../layout';
import { ButtonWrapper, SessionNavigation } from './historiqueStyles';

const Historique = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const { activeUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!activeUser || !activeUser.name) return;

      const sessionsCollectionRef = collection(db, 'Sessions');
      const querySessions = query(
        sessionsCollectionRef,
        where('participant', '==', activeUser.name),
        orderBy('date', 'desc')
      );

      const snapshot = await getDocs(querySessions);
      const fetchedSessions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSessions(fetchedSessions);
      if (fetchedSessions.length > 0) setCurrentSessionIndex(0);
    };

    fetchSessions();
  }, [activeUser]);

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

  const currentSession = useMemo(
    () => (sessions.length > 0 ? sessions[currentSessionIndex] : null),
    [sessions, currentSessionIndex]
  );

  const sessionDate = useMemo(() => {
    if (currentSession?.date?.seconds) {
      return new Date(currentSession.date.seconds * 1000).toLocaleDateString(
        'fr-FR',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }
      );
    }
    return 'Date inconnue';
  }, [currentSession]);

  return (
    <>
      <PageTitle title="Historique" />

      <Collapse title="Calendrier">
        <Calendrier sessions={sessions} />
      </Collapse>

      <Collapse
        title={`Session du ${
          currentSession ? sessionDate : 'Aucune session récente'
        }`}
      >
        {sessions.length === 0 ? (
          <p>Aucune session trouvée.</p>
        ) : (
          <>
            {currentSession ? (
              <>
                <SessionNavigation $hasMultipleSessions={sessions.length > 1}>
                  {currentSessionIndex < sessions.length - 1 && (
                    <Button
                      $variant="secondary"
                      onClick={() => handleSessionNavigation('prev')}
                      $fullWidth={false}
                      $minWidth="40px"
                      $maxWidth="50px"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </Button>
                  )}

                  {currentSessionIndex > 0 && (
                    <Button
                      $variant="secondary"
                      onClick={() => handleSessionNavigation('next')}
                      $fullWidth={false}
                      $minWidth="40px"
                      $maxWidth="50px"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                  )}
                </SessionNavigation>

                <p>
                  Notes : {currentSession.notes || 'Aucune note disponible'}
                </p>
                {currentSession.vigilance && (
                  <p>Vigilance : {currentSession.vigilance}</p>
                )}

                <ButtonWrapper>
                  <Button
                    $variant="primary"
                    onClick={() => handleSelectSession(currentSession.id)}
                  >
                    Modifier
                  </Button>
                </ButtonWrapper>
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
