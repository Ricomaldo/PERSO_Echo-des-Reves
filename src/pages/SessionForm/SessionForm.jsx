import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, ButtonGroup } from '../../components/Button';
import { useUser } from '../../utils/contexts/UserProvider';
import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { v4 as uuidv4 } from 'uuid';
import { Frame, PageTitle } from '../../layout';
import { CustomInput } from '../../components/CustomInput';

const SessionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeUser } = useUser();
  const { saveSession, sessions } = useFirestore();

  const [session, setSession] = useState({
    date: null,
    notes: '',
    vigilance: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      const existingSession = sessions.find((sess) => sess.id === id);
      if (existingSession) {
        setSession({
          ...existingSession,
          date: existingSession.date
            ? new Date(existingSession.date.seconds * 1000)
            : null,
        });
        setIsEditing(true);
      }
    }
  }, [id, sessions]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSession((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSession((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSave = async () => {
    await saveSession(session, id || uuidv4());
    navigate('/dashboard');
  };

  return (
    <>
      <PageTitle
        title={isEditing ? 'Consulter une session' : 'Créer une session'}
      />
      <Frame>
        <CustomInput
          id="date"
          label="Date"
          type="date"
          value={session.date}
          onChange={handleDateChange}
          placeholder="À quelle date cette session a lieu ?"
        />

        <CustomInput
          id="notes"
          label="Prise de note"
          type="textarea"
          value={session.notes}
          onChange={handleChange}
          placeholder="Note ici les points essentiels de cet échange..."
        />

        <CustomInput
          id="vigilance"
          label="Vigilance"
          value={session.vigilance}
          onChange={handleChange}
          placeholder="Qu'est-ce qui mérite toute ton attention ?"
        />
        <ButtonGroup $align="center">
          <Button $variant="secondary" onClick={() => navigate('/dashboard')}>
            Annuler
          </Button>
          <Button $variant="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </ButtonGroup>
      </Frame>
    </>
  );
};

export default SessionForm;
