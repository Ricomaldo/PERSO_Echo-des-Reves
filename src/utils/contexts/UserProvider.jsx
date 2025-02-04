import { useState, useEffect, createContext, useContext } from 'react';
import users from '../../mocks/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const defaultUser = users.find((u) => u.name === 'Eric') || users[0] || null;

  const [activeUser, setActiveUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('activeUser')) || defaultUser;
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
    }
  }, [activeUser]);

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

export const useUser = () => useContext(UserContext);
