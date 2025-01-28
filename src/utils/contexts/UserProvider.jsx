import { useState, useEffect, createContext, useContext } from 'react';
import users from '../users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Charge l'utilisateur actif depuis localStorage ou utilise Eric par défaut
  const [activeUser, setActiveUser] = useState(() => {
    const storedUser = localStorage.getItem('activeUser');
    return storedUser
      ? JSON.parse(storedUser)
      : users.find((u) => u.name === 'Eric');
  });

  // Sauvegarde l'utilisateur actif dans localStorage à chaque changement
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
    }
  }, [activeUser]);

  // Change l'utilisateur actif et le stocke
  const changeUser = (userName) => {
    const user = users.find((u) => u.name === userName); // Recherche l'utilisateur dans le tableau
    setActiveUser(user); // Définit l'utilisateur actif
  };

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
