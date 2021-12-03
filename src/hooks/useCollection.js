import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, c)
    let docsByTimestamp;
    if (c === 'recipe_list')
      docsByTimestamp = query(ref, orderBy("lastEditedTime", "desc"), orderBy("createdTime", "desc"));
    else
      docsByTimestamp = ref;

    const unsub = onSnapshot(docsByTimestamp, (snapshot) => {
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


