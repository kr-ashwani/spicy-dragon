import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

const RecipeListContext = React.createContext();


const RecipeListProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'recipe_list')
    let docsByTimestamp;
    docsByTimestamp = query(ref, orderBy("lastEditedTime", "desc"), orderBy("createdTime", "desc"));

    const unsub = onSnapshot(docsByTimestamp, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      setRecipeList(results)
    })
    return unsub
  }, [])

  return (
    <RecipeListContext.Provider value={{ recipeList }}>
      {children}
    </RecipeListContext.Provider>
  )
}

export { RecipeListProvider, RecipeListContext }
