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
 * 🔥 Hook pour récupérer les données Firestore liées à un utilisateur.
 * @param {string} userName - Nom de l'utilisateur actif.
 * @param {function} setIsLoading - Fonction pour gérer l'état de chargement.
 */
export const useFirestoreData = (userName, setIsLoading) => {
  const [objectifs, setObjectifs] = useState([]); // ✅ Ajout des objectifs
  const [sessions, setSessions] = useState([]); // ✅ Ajout des sessions
  const [themes, setThemes] = useState({});
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    if (!userName) return;
    setIsLoading(true);

    console.log(`📡 Chargement des données Firestore pour ${userName}...`);

    // ✅ Récupération en temps réel des objectifs de l'utilisateur
    const objectifsQuery = query(
      collection(db, 'Objectifs'),
      where('participant', '==', userName)
    );
    const unsubscribeObjectifs = onSnapshot(objectifsQuery, (snapshot) => {
      const objectifsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setObjectifs(objectifsData);
      setIsLoading(false);
      console.log('📌 Objectifs mis à jour en temps réel :', objectifsData);
    });

    // ✅ Récupération en temps réel des sessions de l'utilisateur
    const sessionsQuery = query(
      collection(db, 'Sessions'),
      where('participant', '==', userName),
      orderBy('date', 'desc')
    );
    const unsubscribeSessions = onSnapshot(sessionsQuery, (snapshot) => {
      const sessionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(sessionsData);
      setIsLoading(false);
      console.log('📌 Sessions mises à jour en temps réel :', sessionsData);
    });

    // ✅ Récupération des thèmes Firestore
    const fetchThemes = async () => {
      try {
        const themesSnapshot = await getDocs(collection(db, 'themes'));
        const themesData = themesSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        console.log('📌 Thèmes récupérés depuis Firestore :', themesData);
        setThemes(themesData);
      } catch (error) {
        console.error('❌ Erreur Firestore (thèmes) :', error);
      }
    };

    // ✅ Récupération des préférences utilisateur
    const fetchPreferences = async () => {
      try {
        const userPref = await getDoc(doc(db, 'preferences', userName));
        const preferencesData = userPref.exists() ? userPref.data() : {};
        console.log('📌 Préférences utilisateur récupérées :', preferencesData);
        setPreferences(preferencesData);
      } catch (error) {
        console.error('❌ Erreur Firestore (préférences) :', error);
      }
    };

    // 🔄 Exécute les fetchs une seule fois au chargement
    fetchThemes();
    fetchPreferences();

    // ✅ Nettoyage des abonnements Firestore
    return () => {
      unsubscribeObjectifs();
      unsubscribeSessions();
    };
  }, [userName]);

  return { objectifs, sessions, themes, preferences };
};
