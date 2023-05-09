import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(projectFirestore, collectionName),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
      });
      setDocs(documents);
    });

    return () => unsub();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;






