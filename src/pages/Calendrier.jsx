import React, { useEffect, useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/contexts/UserProvider';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  deleteDoc, // Importé ici
} from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import Collapse from '../components/Collapse';
import Button from '../components/Button';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  .react-calendar {
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    background-color: ${({ theme }) => theme.colors.backgroundNeutral};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 32px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile--hasActive,
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 8px;
  }

  .session-dot {
    background-color: ${({ theme }) => theme.colors.highlight};
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 4px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const Calendrier = () => {
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

  const getTileContent = ({ date }) => {
    const sessionForDate = sessions.find(
      (session) =>
        new Date(session.date.seconds * 1000).toDateString() ===
        date.toDateString()
    );

    return sessionForDate ? (
      <div
        className="session-dot"
        onClick={() => navigate(`/session/${sessionForDate.id}`)}
        title="Voir la session"
      />
    ) : null;
  };

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

  const handleDeleteSession = async (sessionId) => {
    try {
      const sessionRef = doc(db, 'Sessions', sessionId);
      await deleteDoc(sessionRef);

      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== sessionId)
      );

      if (currentSessionIndex >= sessions.length - 1) {
        setCurrentSessionIndex(Math.max(0, sessions.length - 2));
      }

      console.log('Session supprimée avec succès.');
    } catch (e) {
      console.error('Erreur lors de la suppression :', e);
    }
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
      <Collapse title="Calendrier">
        <CalendarWrapper>
          <Calendar tileContent={getTileContent} />
        </CalendarWrapper>
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      sessions.length > 1 ? 'space-between' : 'center',
                    gap: '16px',
                    marginTop: '8px',
                    width: '100%',
                  }}
                >
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
                </div>

                <p>
                  Notes : {currentSession.notes || 'Aucune note disponible'}
                </p>
                {currentSession.vigilance && (
                  <p>Vigilance : {currentSession.vigilance}</p>
                )}

                <ButtonWrapper>
                  {/* <Button
                    $variant="delete"
                    onClick={() => handleDeleteSession(currentSession.id)}
                  >
                    Supprimer
                  </Button> */}
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

export default Calendrier;
