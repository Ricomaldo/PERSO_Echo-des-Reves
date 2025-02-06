import React, { createContext, useContext } from 'react';
import { useUser } from './UserProvider';
import { useFirestoreData } from '../firebase/useFirestoreData';
import { useLeveling } from '../firebase/useLeveling';

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const { activeUser } = useUser();
  const userName = activeUser?.name;

  // Récupère les données Firestore liées à l'utilisateur
  const {
    objectifs,
    sessions,
    preferences,
    themes,
    isLoading,
    setPreferences,
  } = useFirestoreData(userName);

  // Calcule le niveau et les étoiles basés sur les objectifs
  const { currentLevel, currentStars } = useLeveling(objectifs);

  return (
    <FirestoreContext.Provider
      value={{
        objectifs,
        sessions,
        preferences,
        themes,
        isLoading,
        setPreferences,
        currentLevel,
        currentStars,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

// Hook pour accéder facilement aux données Firestore
export const useFirestore = () => useContext(FirestoreContext);
