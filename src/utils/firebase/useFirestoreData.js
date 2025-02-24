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
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    if (!userName) return;

    const incrementLoading = () => setLoadingCount((prev) => prev + 1);
    const decrementLoading = () =>
      setLoadingCount((prev) => {
        const newCount = prev - 1;
        if (newCount === 0) {
          setIsLoading(false);
        }
        return newCount;
      });

    setIsLoading(true);
    incrementLoading();

    const objectifsQuery = query(
      collection(db, 'Objectifs'),
      where('participant', '==', userName)
    );
    const unsubscribeObjectifs = onSnapshot(
      objectifsQuery,
      (snapshot) => {
        setObjectifs(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        decrementLoading();
      },
      (error) => {
        console.error('❌ Erreur écoute objectifs:', error);
        decrementLoading();
      }
    );

    const sessionsQuery = query(
      collection(db, 'Sessions'),
      where('participant', '==', userName),
      orderBy('date', 'desc')
    );
    const unsubscribeSessions = onSnapshot(
      sessionsQuery,
      (snapshot) => {
        setSessions(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        decrementLoading();
      },
      (error) => {
        console.error('❌ Erreur écoute sessions:', error);
        decrementLoading();
      }
    );

    const fetchThemes = async () => {
      try {
        incrementLoading();
        const themesSnapshot = await getDocs(collection(db, 'themes'));
        setThemes(
          themesSnapshot.docs.reduce(
            (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
            {}
          )
        );
        decrementLoading();
      } catch (error) {
        console.error('❌ Erreur récupération thèmes:', error);
        decrementLoading();
      }
    };

    const fetchPreferences = async () => {
      try {
        incrementLoading();
        const userPref = await getDoc(doc(db, 'preferences', userName));
        setPreferences(userPref.exists() ? userPref.data() : {});
        decrementLoading();
      } catch (error) {
        console.error('❌ Erreur récupération préférences:', error);
        decrementLoading();
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
