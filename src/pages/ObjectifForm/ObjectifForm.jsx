import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, ButtonGroup } from '../../components/Button';
import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import { v4 as uuidv4 } from 'uuid';
import { Frame, PageTitle } from '../../layout';
import { CustomInput } from '../../components/CustomInput';

const ObjectifForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveObjectif, deleteObjectif, objectifs } = useFirestore();

  const [objectif, setObjectif] = useState({
    titre: '',
    description: '',
    deadline: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      const existingObjectif = objectifs.find((obj) => obj.id === id);
      if (existingObjectif) {
        setObjectif({
          ...existingObjectif,
          deadline: existingObjectif.deadline
            ? new Date(existingObjectif.deadline.seconds * 1000)
            : null,
        });
        setIsEditing(true);
      }
    }
  }, [id, objectifs]);

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
    const objectifId = id || uuidv4();
    await saveObjectif(
      {
        ...objectif,
        id: objectifId,
        progression: objectif.progression || 0, // ✅ Toujours définir une progression par défaut
      },
      objectifId
    );
    navigate('/dashboard');
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteObjectif(id);
    navigate('/dashboard');
  };

  return (
    <>
      <PageTitle
        title={isEditing ? 'Consulter un objectif' : 'Créer un objectif'}
      />
      <Frame>
        <CustomInput
          id="titre"
          label="Titre"
          value={objectif.titre}
          onChange={handleChange}
          placeholder="Un titre qui nous inspire..."
        />

        <CustomInput
          id="description"
          label="Description"
          type="textarea"
          value={objectif.description}
          onChange={handleChange}
          placeholder="Qu'est-ce qui rend cet objectif motivant ? Pourquoi c'est une priorité ?"
        />
        <CustomInput
          id="etoiles"
          label="Nombre d'étoiles"
          type="number"
          value={objectif.etoiles}
          onChange={handleChange}
          placeholder="Attribuez 1 à 3 étoiles"
        />

        <CustomInput
          id="deadline"
          label="Deadline"
          type="date"
          value={objectif.deadline}
          onChange={handleDateChange}
          placeholder="Choisissez une date"
        />
        <ButtonGroup $align="center">
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
        </ButtonGroup>
      </Frame>
    </>
  );
};

export default ObjectifForm;
