import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Frame from '../layout/Frame';
import Button from '../components/Button';
import { db } from '../utils/firebaseConfig';
import { useUser } from '../utils/contexts/UserProvider'; // Import du UserProvider

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
    font-family: 'caveat', sans-serif;
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
    z-index: 1050; /* Plus élevé que ton menu ou autre contenu */
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ObjectifForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeUser } = useUser(); // Récupère l'utilisateur actif
  const [objectif, setObjectif] = useState({
    titre: '',
    description: '',
    deadline: null, // La deadline est maintenant un objet Date
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchObjectif = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'Objectifs', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setObjectif({
              ...data,
              deadline: data.deadline?.toDate() || null, // Convertir Firestore Timestamp en Date
            });
            setIsEditing(true);
          }
        } catch (e) {
          console.error('Erreur lors du chargement de l’objectif :', e);
        }
      }
    };

    fetchObjectif();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setObjectif((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setObjectif((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'Objectifs', id || crypto.randomUUID());
      const payload = {
        ...objectif,
        deadline: objectif.deadline ? new Date(objectif.deadline) : null, // Convertir en Timestamp Firestore
        participant: activeUser.name, // Ajoute le participant actif
      };
      await setDoc(docRef, payload);
      navigate('/dashboard');
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de l’objectif :', e);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      const docRef = doc(db, 'Objectifs', id);
      await deleteDoc(docRef);
      navigate('/dashboard');
    } catch (e) {
      console.error('Erreur lors de la suppression de l’objectif :', e);
    }
  };

  return (
    <Frame>
      <InputWrapper>
        <label htmlFor="title">Titre :</label>
        <input
          id="titre"
          value={objectif.titre}
          onChange={handleChange}
          placeholder="Un titre qui nous inspire..."
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          value={objectif.description}
          onChange={handleChange}
          placeholder="Qu'est-ce qui rend cet objectif motivant ? Pourquoi c'est une priorité ? "
          style={{ minHeight: '300px' }}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="deadline">Deadline :</label>
        <DatePicker
          selected={objectif.deadline} // La date sélectionnée
          onChange={handleDateChange} // Fonction pour mettre à jour
          dateFormat="yyyy-MM-dd" // Format lisible
          placeholderText="Choisissez une date"
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

export default ObjectifForm;
