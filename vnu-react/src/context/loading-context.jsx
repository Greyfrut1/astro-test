import React, { useContext, createContext, useState } from 'react';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loadingState, setLoadingState] = useState({});

  const setLoadingValue = (newValue) => {
    setLoadingState((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingValue }}>
      {children}
    </LoadingContext.Provider>
  );
}
