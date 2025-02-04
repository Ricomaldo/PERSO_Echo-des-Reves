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
import { toast } from 'react-toastify';

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const { activeUser } = useUser();

  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [themes, setThemes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStars, setCurrentStars] = useState(0);

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

  // 🔹 Calcul des étoiles et du niveau
  useEffect(() => {
    if (objectifs.length > 0) {
      // Récupération des objectifs complétés
      const completedObjectifs = objectifs.filter(
        (obj) => obj.progression === 100
      );

      // ✅ Conversion des étoiles en nombre et addition correcte
      const completedStars = completedObjectifs.reduce(
        (total, obj) => total + Number(obj.etoiles || 0), // 🔥 Transformation en nombre ici !
        0
      );

      console.log('Total des étoiles des objectifs terminés:', completedStars);

      // ✅ Calcul du niveau et des étoiles restantes
      const newLevel = Math.floor(completedStars / 4) + 1; // 4 étoiles par niveau
      const newStars = completedStars % 4; // Étoiles restantes pour le palier

      console.log('Niveau calculé:', newLevel);
      console.log('Étoiles actuelles dans le palier:', newStars);

      if (newLevel > currentLevel) {
        handleLevelUp(newLevel);
      }

      setCurrentLevel(newLevel);
      setCurrentStars(newStars);
    } else {
      console.log('🚨 Aucun objectif terminé trouvé.');
      setCurrentLevel(1);
      setCurrentStars(0);
    }
  }, [objectifs]);

  const handleLevelUp = (newLevel) => {
    toast.success(`🎉 Félicitations ! Niveau ${newLevel} débloqué !`);
  };

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
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
