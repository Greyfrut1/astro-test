import React, { createContext, useState } from 'react';

export const AliasContext = createContext();

export function AliasProvider({ children }) {
  const [currentAlias, setCurrentString] = useState('');

  const updateAlias = (newString) => {
    setCurrentString(newString);
  };

  return (
    <AliasContext.Provider value={{ currentAlias, updateAlias }}>{children}</AliasContext.Provider>
  );
}
