import { useState, useEffect, createContext, useContext } from 'react';
import users from '../../mocks/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Charge l'utilisateur actif depuis localStorage ou utilise un fallback
  const [activeUser, setActiveUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('activeUser');
      return storedUser
        ? JSON.parse(storedUser)
        : users.find((u) => u.name === 'Eric') || null; // Fallback si "Eric" est absent
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur actif :",
        error
      );
      return users.find((u) => u.name === 'Eric') || null;
    }
  });

  // Sauvegarde l'utilisateur actif dans localStorage à chaque changement
  useEffect(() => {
    if (activeUser) {
      try {
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde de l'utilisateur actif :",
          error
        );
      }
    }
  }, [activeUser]);

  // Change l'utilisateur actif et le stocke
  const changeUser = (userName) => {
    const user = users.find((u) => u.name === userName);
    if (user) {
      setActiveUser(user);
    } else {
      console.warn(`Utilisateur "${userName}" introuvable.`);
    }
  };

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
