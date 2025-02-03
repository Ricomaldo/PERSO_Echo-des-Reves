import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../components/Button';
import { db } from '../../utils/firebase/firebaseConfig';
import { useUser } from '../../utils/contexts/UserProvider';
import { v4 as uuidv4 } from 'uuid';
import { Frame, PageTitle } from '../../layout';
import { InputWrapper, ButtonWrapper } from './sessionFormStyles';

const SessionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeUser } = useUser();
  const [session, setSession] = useState({
    date: null,
    notes: '',
    vigilance: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'Sessions', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setSession({
              ...data,
              date: data.date?.toDate() || null,
            });
            setIsEditing(true);
          }
        } catch (e) {
          console.error('Erreur lors du chargement de la session :', e);
        }
      }
    };

    fetchSession();
  }, [id]);

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
    try {
      const docRef = doc(db, 'Sessions', id || uuidv4());
      const payload = {
        ...session,
        date: session.date ? new Date(session.date) : null,
        participant: activeUser.name,
      };
      await setDoc(docRef, payload);
      navigate('/dashboard');
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de la session :', e);
    }
  };

  return (
    <>
      <PageTitle
        title={isEditing ? 'Consulter une session' : 'Créer une session'}
      />
      <Frame>
        <InputWrapper>
          <label htmlFor="date">Date :</label>
          <DatePicker
            selected={session.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="À quelle date cette session a lieu ?"
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="notes">Prise de note :</label>
          <textarea
            id="notes"
            value={session.notes}
            onChange={handleChange}
            placeholder="Note ici les points essentiels de cet échange : les idées marquantes, les objectifs évoqués, les besoins ou attentes exprimées, ainsi que les actions concrètes envisagées. Identifie les obstacles ou freins, les émotions, et les moments de clarté ou de confusion. Capture les ressources ou atouts identifiés, les engagements pris, et les solutions ou pistes qui sont explorées."
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="vigilance">Vigilance :</label>
          <input
            id="vigilance"
            value={session.vigilance}
            onChange={handleChange}
            placeholder="Qu'est-ce qui mérite toute ton attention ?"
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button $variant="secondary" onClick={() => navigate('/dashboard')}>
            Annuler
          </Button>
          <Button $variant="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </ButtonWrapper>
      </Frame>
    </>
  );
};

export default SessionForm;
