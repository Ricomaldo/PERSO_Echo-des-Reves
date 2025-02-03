import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { CalendarWrapper, SessionDot } from './calendarStyles';

const Calendrier = ({ sessions }) => {
  const navigate = useNavigate();

  const sessionMap = useMemo(() => {
    return sessions.reduce((acc, session) => {
      const sessionDate = new Date(session.date.seconds * 1000).toDateString();
      acc[sessionDate] = session.id;
      return acc;
    }, {});
  }, [sessions]);

  const getTileContent = ({ date }) => {
    const sessionId = sessionMap[date.toDateString()];
    return sessionId ? (
      <SessionDot
        onClick={() => navigate(`/session/${sessionId}`)}
        title="Voir la session"
        aria-label="Voir la session"
      />
    ) : null;
  };

  return (
    <CalendarWrapper>
      <Calendar tileContent={getTileContent} />
    </CalendarWrapper>
  );
};

export default Calendrier;
