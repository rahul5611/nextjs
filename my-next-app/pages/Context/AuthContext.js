import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setLoginData = (user) => {
    setUser({ user });
  };

  const removeLoginData = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setLoginData, removeLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
