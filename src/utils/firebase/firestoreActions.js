import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

/** 🔥 Sauvegarde les préférences utilisateur */
export const savePreferences = async (userId, preferences) => {
  if (!preferences || typeof preferences !== 'object') return;
  try {
    await setDoc(doc(db, 'preferences', userId), preferences, { merge: true });
  } catch (error) {
    console.error('❌ Erreur sauvegarde préférences:', error);
  }
};

/** 🎨 Sauvegarde un thème Firestore */
export const saveTheme = async (themeId, themeData) => {
  try {
    await setDoc(doc(db, 'themes', themeId), themeData, { merge: true });
  } catch (error) {
    console.error('❌ Erreur sauvegarde thème:', error);
  }
};

/** 🎯 Sauvegarde ou met à jour un objectif */
export const saveObjectif = async (objectif, userName, id = null) => {
  try {
    const objectifId = id || objectif.id || uuidv4();
    await setDoc(
      doc(db, 'Objectifs', objectifId),
      { ...objectif, participant: userName, id: objectifId },
      { merge: true }
    );
    return objectifId;
  } catch (error) {
    console.error('❌ Erreur sauvegarde objectif:', error);
    return null;
  }
};

/** 🗑️ Supprime un objectif */
export const deleteObjectif = async (id) => {
  try {
    await deleteDoc(doc(db, 'Objectifs', id));
  } catch (error) {
    console.error('❌ Erreur suppression objectif:', error);
  }
};

export const saveSession = async (session, userName, id = null) => {
  try {
    const sessionId = id || uuidv4();
    const docRef = doc(db, 'Sessions', sessionId);

    await setDoc(
      docRef,
      { ...session, participant: userName },
      { merge: true }
    );

    return sessionId;
  } catch (error) {
    console.error('❌ Erreur sauvegarde session:', error);
    return null;
  }
};
