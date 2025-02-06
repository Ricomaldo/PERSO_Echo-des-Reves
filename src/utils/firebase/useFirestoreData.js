import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
  orderBy,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

/**
 * Gère la récupération des données Firestore liées à un utilisateur.
 * @param {string} userName - Nom de l'utilisateur actif.
 */
export const useFirestoreData = (userName) => {
  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [themes, setThemes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Récupération des objectifs et sessions en temps réel
  useEffect(() => {
    if (!userName) return;

    const objectifsQuery = query(
      collection(db, 'Objectifs'),
      where('participant', '==', userName)
    );
    const watchObjectifs = onSnapshot(objectifsQuery, (snapshot) => {
      setObjectifs(
        snapshot.docs
          .map((doc) => {
            const data = doc.data();
            if (!data.id) {
              console.warn('⚠️ Objectif sans ID détecté dans Firestore:', data);
            }
            return { id: doc.id, ...data };
          })
          .filter((obj) => obj.id) // Filtrer les objectifs sans ID
      );

      setIsLoading(false);
    });

    const sessionsQuery = query(
      collection(db, 'Sessions'),
      where('participant', '==', userName),
      orderBy('date', 'desc')
    );
    const watchSessions = onSnapshot(sessionsQuery, (snapshot) => {
      setSessions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      watchObjectifs();
      watchSessions();
    };
  }, [userName]);

  // Chargement des préférences utilisateur et des thèmes disponibles
  useEffect(() => {
    if (!userName) return;

    const fetchData = async () => {
      try {
        // Chargement des préférences
        const userPreferences = await getDoc(doc(db, 'preferences', userName));
        setPreferences(
          userPreferences.exists()
            ? userPreferences.data()
            : { favoriteThemes: {} }
        );

        // Chargement des thèmes Firestore
        const userThemes = await getDocs(collection(db, 'themes'));
        setThemes(
          userThemes.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data();
            return acc;
          }, {})
        );
      } catch (error) {
        console.error('❌ Erreur Firestore :', error);
      }
    };

    fetchData();
  }, [userName]);

  return {
    objectifs,
    sessions,
    preferences,
    themes,
    isLoading,
    setPreferences,
  };
};
