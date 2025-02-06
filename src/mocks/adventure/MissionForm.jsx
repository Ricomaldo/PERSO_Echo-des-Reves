import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebaseConfig';

function MissionForm() {
  // États pour gérer les entrées du formulaire, utiliser nous devons.
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  // Fonction pour ajouter un compte-rendu à Firestore.
  const ajouterCompteRendu = async (e) => {
    e.preventDefault(); // Pour éviter le rechargement de la page, stopper nous devons.
    try {
      await addDoc(collection(db, 'missions'), {
        titre: titre,
        description: description,
        date: new Date(),
        auteur: 'Padawan Irim',
      });
      // Réinitialiser le formulaire.
      setTitre('');
      setDescription('');
    } catch (e) {
      console.error('Erreur lors de l’ajout du compte-rendu :', e);
    }
  };

  return (
    <>
      <p>+++++ Ajouter un nouveau compte-rendu +++++</p>
      <form onSubmit={ajouterCompteRendu}>
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
        <button type="submit" style={{ marginTop: '16px' }}>
          ++++Enregistrer le compte-rendu++++
        </button>
      </form>
    </>
  );
}

export default MissionForm;
