import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';

const UpdateMissionForm = ({ missionId, initialData }) => {
  const [titre, setTitre] = useState(initialData.titre || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'missions', missionId);
      await updateDoc(docRef, { titre, description });
      console.log('Mise à jour réussie.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label htmlFor="titre">Titre :</label>
        <input
          type="text"
          id="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default UpdateMissionForm;
