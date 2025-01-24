import { useState, createContext, useContext } from 'react';
import users from '../users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(() =>
    users.find((u) => u.name === 'Eric')
  );

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
