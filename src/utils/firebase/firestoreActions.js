import { db } from './firebaseConfig';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

/**
 * Sauvegarde un objectif (ajout ou mise à jour)
 * @param {Object} objectif - Données de l'objectif
 * @param {string} userName - Nom de l'utilisateur actif
 * @param {string} [id=null] - ID de l'objectif (si mise à jour)
 */
export const saveObjectif = async (objectif, userName, id = null) => {
  try {
    const objectifId = id || objectif.id || uuidv4(); // ✅ Utilise l'ID existant si présent
    const docRef = doc(db, 'Objectifs', objectifId);

    await setDoc(
      docRef,
      { ...objectif, participant: userName, id: objectifId }, // ✅ Assure que l'ID est toujours correct
      { merge: true } // ✅ Fusionne les données au lieu d’écraser
    );

    console.log(`✅ Objectif sauvegardé/mis à jour : ${objectifId}`);
    return objectifId;
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde de l’objectif :', error);
    return null;
  }
};

/**
 * Supprime un objectif
 * @param {string} id - ID de l'objectif à supprimer
 */
export const deleteObjectif = async (id) => {
  try {
    await deleteDoc(doc(db, 'Objectifs', id));
    console.log(`🗑️ Objectif supprimé : ${id}`);
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l’objectif :', error);
  }
};

/**
 * Sauvegarde une session (ajout ou mise à jour)
 * @param {Object} session - Données de la session
 * @param {string} userName - Nom de l'utilisateur actif
 * @param {string} [id=null] - ID de la session (si mise à jour)
 */
export const saveSession = async (session, userName, id = null) => {
  try {
    const sessionId = id || uuidv4();
    const docRef = doc(db, 'Sessions', sessionId);
    await setDoc(
      docRef,
      { ...session, participant: userName },
      { merge: true }
    );
    console.log(`✅ Session sauvegardée : ${sessionId}`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde de la session :', error);
  }
};
