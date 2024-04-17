// DataContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext({
  userData: null,
  login: () => {},
  logout: () => {},
});

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('authUserData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const login = (authUserData, id, power) => {
    if (authUserData) {
      localStorage.setItem('authUserData', JSON.stringify(authUserData));
      setUserData(authUserData);
    } else {
      console.error('Invalid authUserData format or missing email:', authUserData);
    }

  };

  const logout = () => {
    localStorage.removeItem('authUserData');
    setUserData(null);
  };

  return (
    <DataContext.Provider value={{ userData, login, logout}}>
      {children}
    </DataContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAuth must be used within a DataProvider');
  }
  return context;
};
