import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useUser } from './UserProvider';
import { v4 as uuidv4 } from 'uuid';

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const { activeUser } = useUser();

  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [themes, setThemes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Chargement en temps réel des objectifs
  useEffect(() => {
    if (!activeUser || !activeUser.name) return;

    const objectifsQuery = query(
      collection(db, 'Objectifs'),
      where('participant', '==', activeUser.name)
    );

    const unsubscribe = onSnapshot(objectifsQuery, (snapshot) => {
      setObjectifs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false); // ✅ Indiquer que le chargement est terminé
    });

    return () => unsubscribe();
  }, [activeUser]);

  // 🔹 Chargement en temps réel des sessions
  useEffect(() => {
    if (!activeUser || !activeUser.name) return;

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

  // 🔹 Chargement des préférences (fetch unique)
  useEffect(() => {
    const fetchPreferences = async () => {
      const snapshot = await getDocs(collection(db, 'Preferences'));
      if (!snapshot.empty) {
        setPreferences(
          snapshot.docs.reduce(
            (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
            {}
          )
        );
      }
    };
    fetchPreferences();
  }, []);

  // 🔹 Chargement des thèmes (fetch unique)
  useEffect(() => {
    const fetchThemes = async () => {
      const snapshot = await getDocs(collection(db, 'Themes'));
      if (!snapshot.empty) {
        setThemes(
          snapshot.docs.reduce(
            (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
            {}
          )
        );
      }
    };
    fetchThemes();
  }, []);

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
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
