import { doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';

export const useDoc = (collectionName) => {
  const [document, setDocument] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setDocument()
      return;
    }

    const ref = doc(db, collectionName, currentUser.uid)
    const unsub = onSnapshot(ref, (doc) => {
      setDocument(doc.data());
    });
    return unsub
  }, [currentUser, collectionName])

  return { document }
}


