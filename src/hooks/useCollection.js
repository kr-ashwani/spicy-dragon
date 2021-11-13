import { collection, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, c)

    const unsub = onSnapshot(ref, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      setDocuments(results)
    })
    return unsub
  }, [c])

  return { documents }
}


