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

export const useFirestoreData = (userName, setIsLoading) => {
  const [objectifs, setObjectifs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [themes, setThemes] = useState({});
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    if (!userName) return;
    setIsLoading(true);

    const objectifsQuery = query(
      collection(db, 'Objectifs'),
      where('participant', '==', userName)
    );
    const unsubscribeObjectifs = onSnapshot(objectifsQuery, (snapshot) => {
      setObjectifs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });

    const sessionsQuery = query(
      collection(db, 'Sessions'),
      where('participant', '==', userName),
      orderBy('date', 'desc')
    );
    const unsubscribeSessions = onSnapshot(sessionsQuery, (snapshot) => {
      setSessions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });

    const fetchThemes = async () => {
      try {
        const themesSnapshot = await getDocs(collection(db, 'themes'));
        setThemes(
          themesSnapshot.docs.reduce(
            (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
            {}
          )
        );
      } catch (error) {
        console.error('❌ Erreur récupération thèmes:', error);
      }
    };

    const fetchPreferences = async () => {
      try {
        const userPref = await getDoc(doc(db, 'preferences', userName));
        setPreferences(userPref.exists() ? userPref.data() : {});
      } catch (error) {
        console.error('❌ Erreur récupération préférences:', error);
      }
    };

    fetchThemes();
    fetchPreferences();

    return () => {
      unsubscribeObjectifs();
      unsubscribeSessions();
    };
  }, [userName]);
  return { objectifs, sessions, themes, preferences };
};
