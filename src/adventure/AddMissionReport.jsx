// Importer la Force Firebase, nous devons.
import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; // La connexion à Firestore.

function AddMissionReport() {
  // Fonction pour ajouter un compte-rendu.
  const ajouterCompteRendu = async () => {
    try {
      // Ajouter un document à la collection 'missions', ici nous faisons.
      const docRef = await addDoc(collection(db, 'missions'), {
        titre: 'Analyse des TIE Fighters',
        description:
          'Vaisseaux rapides, mais blindage faible. Détruire les panneaux solaires, il faut.',
        date: new Date(), // La date de création.
        auteur: 'Padawan Koda',
      });
      console.log('Compte-rendu ajouté avec succès :', docRef.id); // Succès, dans la console, nous voyons.
    } catch (e) {
      console.error('Erreur lors de l’ajout du compte-rendu :', e); // Une erreur, signalée elle sera.
    }
  };

  return (
    <>
      <p>+++++ Ajoute un compte-rendu des missions critiques, ici. +++++</p>
      <button onClick={ajouterCompteRendu}>Ajouter un compte-rendu</button>
    </>
  );
}

export default AddMissionReport;
