import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Styles par défaut du calendrier
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/contexts/UserProvider';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

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

const Calendrier = () => {
  const [sessions, setSessions] = useState([]); // Stocker les sessions
  const { activeUser } = useUser(); // Utilisateur actif
  const navigate = useNavigate(); // Navigation pour rediriger

  useEffect(() => {
    const fetchSessions = async () => {
      if (!activeUser || !activeUser.name) return;

      const sessionsCollectionRef = collection(db, 'Sessions');
      const querySessions = query(
        sessionsCollectionRef,
        where('participant', '==', activeUser.name)
      );

      const snapshot = await getDocs(querySessions);
      const sessions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(sessions);
    };

    fetchSessions();
  }, [activeUser]);

  // Fonction pour retourner les pastilles pour les dates avec des sessions
  const getTileContent = ({ date }) => {
    // Vérifie si une session correspond à cette date
    const sessionForDate = sessions.find(
      (session) =>
        new Date(session.date.seconds * 1000).toDateString() ===
        date.toDateString()
    );

    if (sessionForDate) {
      return (
        <div
          className="session-dot"
          onClick={() => navigate(`/session/${sessionForDate.id}`)}
          title="Voir la session"
        ></div>
      );
    }
    return null; // Aucune pastille pour cette date
  };

  return (
    <CalendarWrapper>
      <Calendar
        tileContent={getTileContent} // Ajoute les pastilles
        onClickDay={(date) => console.log(`Jour sélectionné : ${date}`)} // Facultatif
      />
    </CalendarWrapper>
  );
};

export default Calendrier;
