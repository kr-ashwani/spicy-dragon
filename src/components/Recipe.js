import { deleteDoc, doc } from '@firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router'
import { db } from '../firebase/firebaseConfig'
import './css/Recipe.css'

function Recipe({ recipe, id, navColor }) {
  const navigate = useNavigate()


  function cookFunction() {
    navigate(`/recipe/${id}`)
  }
  async function removeRecipe() {
    let ref = doc(db, 'recipe_list', id);
    try {
      await deleteDoc(ref);
      alert("Reciped removed!")
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
    <div className="recipe_item" >
      <i onClick={removeRecipe} className="fas fa-trash-alt"></i>
      <div className="recipe_card">
        <p>{recipe.title}</p>
        <p>{recipe.time} minutes to make</p>
        <p className="recipeMethod">{truncateString(recipe.method, 20)}</p>
        <button onClick={cookFunction} style={{ backgroundColor: `${navColor}`, color: "#fff" }}>Cook This</button>
      </div>
    </div>
  )
}

export default Recipe
