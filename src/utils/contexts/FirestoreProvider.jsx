import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUser } from './UserProvider';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const { activeUser } = useUser(); // ✅ Attendre UserProvider
  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [themes, setThemes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStars, setCurrentStars] = useState(0);

  // 🔹 Objectifs & Sessions
  useEffect(() => {
    if (!activeUser || !activeUser.name) return;

    const objectifsQuery = query(
      collection(db, 'Objectifs'),
      where('participant', '==', activeUser.name)
    );

    const unsubscribe = onSnapshot(objectifsQuery, (snapshot) => {
      setObjectifs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [activeUser]);

  useEffect(() => {
    if (!activeUser) return;

    const sessionsQuery = query(
      collection(db, 'Sessions'),
      where('participant', '==', activeUser.name),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(sessionsQuery, (snapshot) => {
      setSessions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [activeUser]);

  // 🔹 Chargement des préférences & thèmes à chaque changement d'utilisateur
  useEffect(() => {
    if (!activeUser?.name) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Charger les préférences de l'utilisateur
        const prefDoc = doc(db, 'Preferences', activeUser.name);
        const prefSnap = await getDoc(prefDoc);
        if (prefSnap.exists()) {
          setPreferences(prefSnap.data());
        } else {
          console.warn('⚠️ Aucune préférence trouvée pour cet utilisateur.');
        }

        // Charger tous les thèmes
        const themesSnap = await getDocs(collection(db, 'Themes'));
        setThemes(
          themesSnap.docs.reduce(
            (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
            {}
          )
        );
      } catch (error) {
        console.error(
          '❌ Erreur lors du chargement des préférences/thèmes :',
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeUser]); // 🔄 Rechargé à chaque changement d'utilisateur

  const updatePreferences = async (newPreferences) => {
    try {
      const userPreferencesRef = doc(db, 'Preferences', activeUser.name);
      await setDoc(userPreferencesRef, newPreferences, { merge: true });
      setPreferences(newPreferences);
    } catch (error) {
      console.error(
        '❌ Erreur lors de la mise à jour des préférences :',
        error
      );
    }
  };

  // 🔹 Gestion des étoiles et niveaux
  useEffect(() => {
    const completedStars = objectifs
      .filter((o) => o.progression === 100)
      .reduce((acc, obj) => acc + Number(obj.etoiles || 0), 0);
    const newLevel = Math.floor(completedStars / 4) + 1;
    const newStars = completedStars % 4;

    if (newLevel > currentLevel)
      toast.success(`🎉 Niveau ${newLevel} débloqué !`);
    setCurrentLevel(newLevel);
    setCurrentStars(newStars);
  }, [objectifs]);

  // 🔥 🔹 **Fonctions CRUD pour les Objectifs**
  const saveObjectif = async (objectif, id = null) => {
    try {
      const objectifId = id || uuidv4();
      const docRef = doc(db, 'Objectifs', objectifId);
      await setDoc(docRef, { ...objectif, participant: activeUser.name });
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de l’objectif :', e);
    }
  };

  const deleteObjectif = async (id) => {
    try {
      await deleteDoc(doc(db, 'Objectifs', id));
    } catch (e) {
      console.error('Erreur lors de la suppression de l’objectif :', e);
    }
  };

  // 🔥 🔹 **Fonctions CRUD pour les Sessions**
  const saveSession = async (session, id = null) => {
    try {
      const sessionId = id || uuidv4();
      const docRef = doc(db, 'Sessions', sessionId);
      await setDoc(docRef, { ...session, participant: activeUser.name });
    } catch (e) {
      console.error('Erreur lors de la sauvegarde de la session :', e);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        objectifs,
        sessions,
        preferences,
        themes,
        isLoading,
        saveObjectif,
        deleteObjectif,
        saveSession,
        currentLevel, // 🚀 Exposer le niveau
        currentStars, // 🚀 Exposer les étoiles
        setPreferences, // 🔹 Pour les mises à jour locales uniquement (rarement utilisé)
        updatePreferences, // 🔹 Pour les mises à jour complètes (local + Firestore)
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
