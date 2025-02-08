import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

/**
 * 💾 Sauvegarde les préférences utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @param {object} preferences - Objet contenant les préférences utilisateur
 */
export const savePreferences = async (userId, preferences) => {
  if (!preferences || typeof preferences !== 'object') {
    console.error(
      '❌ Erreur : Données invalides envoyées à Firestore',
      preferences
    );
    return;
  }

  try {
    await setDoc(doc(db, 'preferences', userId), preferences, { merge: true });
    console.log('✅ Préférences mises à jour avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde des préférences :', error);
  }
};

/**
 * 💾 Sauvegarde un thème Firestore
 * @param {string} themeId - ID du thème
 * @param {object} themeData - Données du thème
 */
export const saveTheme = async (themeId, themeData) => {
  try {
    await setDoc(doc(db, 'themes', themeId), themeData, { merge: true });
    console.log(`✅ Thème "${themeId}" sauvegardé avec succès`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde du thème :', error);
  }
};

/**
 * 💾 Sauvegarde un objectif (ajout ou mise à jour)
 * @param {object} objectif - Données de l'objectif
 * @param {string} userName - Nom de l'utilisateur actif
 * @param {string} [id=null] - ID de l'objectif (si mise à jour)
 */
export const saveObjectif = async (objectif, userName, id = null) => {
  try {
    const objectifId = id || objectif.id || uuidv4();
    const docRef = doc(db, 'Objectifs', objectifId);

    await setDoc(
      docRef,
      { ...objectif, participant: userName, id: objectifId },
      { merge: true }
    );

    console.log(`✅ Objectif sauvegardé/mis à jour : ${objectifId}`);
    return objectifId;
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde de l’objectif :', error);
    return null;
  }
};

/**
 * 🗑️ Supprime un objectif
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
 * 💾 Sauvegarde une session (ajout ou mise à jour)
 * @param {object} session - Données de la session
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

/**
 * 🗑️ Supprime une session
 * @param {string} id - ID de la session à supprimer
 */
export const deleteSession = async (id) => {
  try {
    await deleteDoc(doc(db, 'Sessions', id));
    console.log(`🗑️ Session supprimée : ${id}`);
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la session :', error);
  }
};
