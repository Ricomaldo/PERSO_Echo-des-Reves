import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../utils/contexts/UserProvider'; // ✅ Importer useUser

import { useFirestore } from '../../utils/contexts/FirestoreProvider';
import {
  saveObjectif,
  deleteObjectif,
} from '../../utils/firebase/firestoreActions';
import { Button, ButtonGroup } from '../../components/Button';
import { Frame, PageTitle } from '../../layout';
import { CustomInput } from '../../components/CustomInput';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

const ObjectifForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeUser } = useUser(); // ✅ Récupérer l'utilisateur actif
  const { objectifs } = useFirestore(); // ⚡ On récupère uniquement les objectifs

  const [objectif, setObjectif] = useState({
    titre: '',
    description: '',
    etoiles: 0, // Valeur par défaut (1 étoile)
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

  const handleChange = (value) => {
    setObjectif((prev) => ({
      ...prev,
      etoiles: value,
    }));
  };

  const handleDateChange = (date) => {
    setObjectif((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  const handleSave = async () => {
    const objectifId = id || uuidv4(); // Utilise `id` s'il est présent
    const isNew = !id || !objectifs.some((obj) => obj.id === id); // Vérifie si l'élément est nouveau

    await saveObjectif(
      {
        ...objectif,
        id: objectifId,
        progression: objectif.progression || 0, // Toujours définir une progression
      },
      activeUser?.name, // Ajoute le nom de l'utilisateur pour éviter l'ID incorrect
      isNew ? null : objectifId // Passe `null` pour un nouvel élément, l'ID sinon
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
        title={isEditing ? 'Modifier un objectif' : 'Créer un objectif'}
      />
      <Frame>
        <CustomInput
          id="titre"
          label="Titre"
          value={objectif.titre}
          onChange={handleChange}
          placeholder="Un titre motivant..."
        />

        <CustomInput
          id="description"
          label="Description"
          type="textarea"
          value={objectif.description}
          onChange={handleChange}
          placeholder="Pourquoi cet objectif est important ?"
        />

        <CustomInput
          id="etoiles"
          label="Difficulté"
          type="stars"
          value={objectif.etoiles}
          onChange={handleChange}
        />

        <CustomInput
          id="progression"
          label="Progression"
          type="number"
          value={objectif.progression}
          onChange={handleChange}
          placeholder="Entre 0 et 100"
          min="0"
          max="100"
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
