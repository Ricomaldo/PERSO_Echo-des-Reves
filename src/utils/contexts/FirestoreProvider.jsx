import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserProvider';
import { useFirestoreData } from '../firebase/useFirestoreData';
import { useLeveling } from '../firebase/useLeveling';
import { LoaderScreen } from '../../components/LoaderScreen'; // ✅ Import du Loader

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const { activeUser } = useUser();
  const userName = activeUser?.name;
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Récupération des données Firestore
  const { objectifs, sessions, preferences, themes } = useFirestoreData(
    userName,
    setIsLoading
  );

  // ✅ Gestion de la progression
  const { currentLevel, currentStars } = useLeveling(objectifs);

  if (isLoading) return <LoaderScreen />;

  return (
    <FirestoreContext.Provider
      value={{
        objectifs,
        sessions,
        preferences,
        themes,
        currentLevel,
        currentStars,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
