import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Frame from '../layout/Frame';
import Button from '../components/Button';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../utils/contexts/UserProvider'; // Import UserProvider

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundNeutral};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.borderNeutral};
    border-radius: 8px;
    padding: 8px;
    font-family: 'Caveat', sans-serif;
    font-size: 20px;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }

  textarea {
    height: 100px;
    resize: none;
  }

  .react-datepicker-popper {
    z-index: 1050;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const SessionForm = () => {
  const { id } = useParams(); // Récupère l'ID de la session
  const navigate = useNavigate();
  const { activeUser } = useUser(); // Récupère l'utilisateur actif
  const [session, setSession] = useState({
    date: null, // La date est un objet Date
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
              date: data.date?.toDate() || null, // Convertir Firestore Timestamp en Date
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
      const docRef = doc(db, 'Sessions', id || crypto.randomUUID());
      const payload = {
        ...session,
        date: session.date ? new Date(session.date) : null, // Convertir en Timestamp Firestore
        participant: activeUser.name, // Associer à l'utilisateur actif
      };
      await setDoc(docRef, payload);
      navigate('/dashboard'); // Retourner au dashboard après la sauvegarde
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de la session :', e);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      const docRef = doc(db, 'Sessions', id);
      await deleteDoc(docRef);
      navigate('/dashboard'); // Retourner au dashboard après la suppression
    } catch (e) {
      console.error('Erreur lors de la suppression de la session :', e);
    }
  };

  return (
    <Frame>
      <InputWrapper>
        <label htmlFor="date">Date :</label>
        <DatePicker
          selected={session.date} // La date sélectionnée
          onChange={handleDateChange} // Fonction pour mettre à jour
          dateFormat="yyyy-MM-dd" // Format lisible
          placeholderText="À quelle date cette session a lieu ?"
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="notes">Prise de note :</label>
        <textarea
          id="notes"
          value={session.notes}
          onChange={handleChange}
          placeholder="Note ici les points essentiels de cet échange..."
          style={{ minHeight: '300px' }}
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
        <Button $variant="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
        <Button $variant="secondary" onClick={() => navigate('/dashboard')}>
          Annuler
        </Button>
        {isEditing && (
          <Button $variant="delete" onClick={handleDelete}>
            Supprimer
          </Button>
        )}
      </ButtonWrapper>
    </Frame>
  );
};

export default SessionForm;
