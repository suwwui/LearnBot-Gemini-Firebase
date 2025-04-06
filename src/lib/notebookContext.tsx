import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import {
  Timestamp,
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase.config';

export interface NotebookData {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  color: string;
  tintColor: string;
}

interface NotebookContextType {
  notebooks: NotebookData[];
  fetchNotebooks: () => void;
  addNote: (title: string) => void;
  handleDeleteNote: (id: string) => void;
}

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

export const useNotebooks = () => {
  const context = useContext(NotebookContext);
  if (!context) {
    throw new Error("useNotebooks must be used within a NotebookProvider");
  }
  return context;
};

export const NotebookProvider = ({ children }: { children: ReactNode }) => {
  const [notebooks, setNotebooks] = useState<NotebookData[]>([]);
  const uid = auth.currentUser?.uid;

  const notebooksCollection = useMemo(
    () =>
      uid
        ? (collection(getFirestore(), `users/${uid}/notebooks`) as CollectionReference<NotebookData>)
        : null,
    [uid]
  );

  const fetchNotebooks = async () => {
    if (!notebooksCollection) return;

    try {
      const notebookSnapshot = await getDocs(notebooksCollection);
      const notebookList = notebookSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content || "",
        createdAt: doc.data().createdAt || Timestamp.fromDate(new Date()),
        color: doc.data().color || "#FFFFFF",
        tintColor: doc.data().tintColor || "#000000"
      }));

      setNotebooks(notebookList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    } catch (err) {
      console.error("Error fetching notebooks:", err);
    }
  };

  const pastelColors = ['#fde0c6', '#fbc9c3', '#fdd0d6', '#e8c3db', '#bae4f3', '#C1E5D9', '#d3eada', '#f5f3d9'];
  const tintColors = ['#7d684f', '#7d594e', '#7e5a62', '#715967', '#4b6c78', '#4eb5a3', '#5d6d5a', '#77746e'];

  const getRandomPastelColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

  const addNote = async (title: string) => {
    if (!uid || !notebooksCollection) return;

    const newDate = Timestamp.fromDate(new Date());
    const randomPastelColor = getRandomPastelColor();
    const randomTintColor = tintColors[pastelColors.indexOf(randomPastelColor)];

    try {
      const docRef = await addDoc(notebooksCollection, {
        title,
        content: '',
        createdAt: newDate,
        id: auth.currentUser?.uid || 'unknown',
        color: randomPastelColor,
        tintColor: randomTintColor
      });

      setNotebooks((prev) => [
        { id: docRef.id, 
        title, content: '', 
        createdAt: newDate, 
        color: randomPastelColor, 
        tintColor: randomTintColor },
        ...prev
      ]);
    } catch (err) {
      console.error("Error adding notebook:", err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!uid || !notebooksCollection) return;

    try {
      await deleteDoc(doc(db, `users/${uid}/notebooks`, id));
      setNotebooks((prev) => prev.filter((notebook) => notebook.id !== id));
    } catch (err) {
      console.error("Error deleting notebook:", err);
    }
  };

  useEffect(() => {
    fetchNotebooks();
  }, [notebooksCollection]);

  return (
    <NotebookContext.Provider value={{ notebooks, fetchNotebooks, addNote, handleDeleteNote }}>
      {children}
    </NotebookContext.Provider>
  );
};