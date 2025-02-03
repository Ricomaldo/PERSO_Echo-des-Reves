import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../components/Button';
import { db } from '../../utils/firebase/firebaseConfig';
import { useUser } from '../../utils/contexts/UserProvider';
import { v4 as uuidv4 } from 'uuid';
import { Frame, PageTitle } from '../../layout';
import { InputWrapper, ButtonWrapper } from './objectifFormStyles';

const ObjectifForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeUser } = useUser();
  const [objectif, setObjectif] = useState({
    titre: '',
    description: '',
    deadline: null,
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
              deadline: data.deadline?.toDate() || null,
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
      const docRef = doc(db, 'Objectifs', id || uuidv4());
      const payload = {
        ...objectif,
        deadline: objectif.deadline ? new Date(objectif.deadline) : null,
        participant: activeUser.name,
        progression: 0,
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
    <>
      <PageTitle
        title={isEditing ? 'Consulter un objectif' : 'Créer un objectif'}
      />
      <Frame>
        <InputWrapper>
          <label htmlFor="titre">Titre :</label>
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
            placeholder="Qu'est-ce qui rend cet objectif motivant ? Pourquoi c'est une priorité ?"
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="deadline">Deadline :</label>
          <DatePicker
            selected={objectif.deadline}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Choisissez une date"
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button $variant="secondary" onClick={() => navigate('/dashboard')}>
            Annuler
          </Button>
          {isEditing && (
            <Button $variant="delete" onClick={handleDelete}>
              Supprimer
            </Button>
          )}
          <Button $variant="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </ButtonWrapper>
      </Frame>
    </>
  );
};

export default ObjectifForm;
