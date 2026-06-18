import { createContext, useContext, useState, useEffect } from 'react';

const NamesContext = createContext(null);

export function NamesProvider({ children }) {
  const [names, setNames] = useState(() => {
    try {
      const stored = localStorage.getItem('training_names');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('training_names', JSON.stringify(names));
  }, [names]);

  const addName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    setNames(prev => [...prev, trimmed]);
    return true;
  };

  const clearNames = () => setNames([]);

  return (
    <NamesContext.Provider value={{ names, addName, clearNames }}>
      {children}
    </NamesContext.Provider>
  );
}

export function useNames() {
  const ctx = useContext(NamesContext);
  if (!ctx) throw new Error('useNames must be used within NamesProvider');
  return ctx;
}
