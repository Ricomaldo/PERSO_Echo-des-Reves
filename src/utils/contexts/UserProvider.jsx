import { useState, useEffect, createContext, useContext } from 'react';
import users from '../../mocks/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Utilisateur par défaut : "Eric" ou le premier de la liste
  const defaultUser = users.find((u) => u.name === 'Eric') || users[0] || null;

  // État pour l'utilisateur actif, initialisé depuis localStorage ou par défaut
  const [activeUser, setActiveUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('activeUser')) || defaultUser;
    } catch {
      return defaultUser;
    }
  });

  // Synchronise l'utilisateur actif avec localStorage
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
    }
  }, [activeUser]);

  // Permet de changer l'utilisateur actif en recherchant dans `users`
  const changeUser = (userName) => {
    const user = users.find((u) => u.name === userName);
    if (user) {
      setActiveUser(user);
    } else {
      console.warn(`⚠️ Utilisateur "${userName}" introuvable.`);
    }
  };

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pour accéder facilement au contexte utilisateur
export const useUser = () => useContext(UserContext);
