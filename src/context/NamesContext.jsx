
import { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";

const NamesContext = createContext(null);

export function NamesProvider({ children }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
      setNames(data);
    });
    return () => unsubscribe();
  }, []);

  const removeName = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  const clearNames = async () => {
    const batch = writeBatch(db);
    names.forEach(({ id }) => batch.delete(doc(db, "users", id)));
    await batch.commit();
  };

  return (
    <NamesContext.Provider value={{ names, removeName, clearNames }}>
      {children}
    </NamesContext.Provider>
  );
}

export function useNames() {
  const ctx = useContext(NamesContext);
  if (!ctx) throw new Error('useNames must be used within NamesProvider');
  return ctx;
}