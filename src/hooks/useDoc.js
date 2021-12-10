import { doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export const useDoc = (collectionName, documentUid) => {
  const [document, setDocument] = useState();


  useEffect(() => {
    if (!collectionName && !documentUid)
      return;

    const ref = doc(db, collectionName, documentUid)

    const unsub = onSnapshot(ref, (doc) => {
      setDocument(doc.data());
    });
    return unsub
  }, [collectionName, documentUid])

  return { document }
}


