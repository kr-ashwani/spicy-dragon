import { deleteDoc, doc, getDoc } from '@firebase/firestore'
import { deleteObject, ref } from '@firebase/storage'
import React from 'react'
import { useNavigate } from 'react-router'
import { db, storage } from '../firebase/firebaseConfig'
import { useTheme } from '../hooks/useTheme'
import './css/Recipe.css'

function Recipe({ recipe, id }) {
  const { mode } = useTheme();
  const navigate = useNavigate()
  const { navColor } = useTheme();

  function cookFunction() {
    navigate(`/recipe/${id}`)
  }
  async function removeRecipe() {
    try {
      let deleteCnf = window.confirm("Are you sure you want to delete recipe?")
      if (deleteCnf) {
        const docSnap = await getDoc(doc(db, "recipe_list", id));
        if (docSnap.exists()) {
          const recipeData = docSnap.data();
          const imgRef = ref(storage, recipeData.recipeImagePath);
          await deleteObject(imgRef)
          await deleteDoc(doc(db, 'recipe_list', id));
        }
      }
    }
    catch (err) {
      alert("Failed to remove recipe!", err.message)
    }
  }
  function truncateString(inputString, noOfWords) {
    let arrayOfWords = inputString.trim().split(" ");
    if (arrayOfWords.length < noOfWords)
      return inputString
    const truncated = arrayOfWords.slice(0, noOfWords).join(' ').concat('...');
    return truncated;
  }
  return (
    <div className={`recipe_item ${mode}`} >
      <i onClick={removeRecipe} className="fas fa-trash-alt"></i>
      <div className="recipe_card">
        <div className="recipe_img">
          <img src={`${recipe.recipeImageUrl}`} alt={`${recipe.title}`} />
        </div>
        <p>{recipe.title}</p>
        <p className={`${mode}`}>{recipe.time} minutes to make</p>
        <p className="recipeMethod">{truncateString(recipe.method, 20)}</p>
        <button onClick={cookFunction} style={{ backgroundColor: `${navColor}`, color: "#fff" }}>Cook This</button>
      </div>
    </ div>
  )
}

export default Recipe
