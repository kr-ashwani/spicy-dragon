import { deleteDoc, doc } from '@firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router'
import { db } from '../firebase/firebaseConfig'
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
    <div className={`recipe_item ${mode}`} >
      <i onClick={removeRecipe} className="fas fa-trash-alt"></i>
      <div className="recipe_card">
        <div className="recipe_img">
          <img src="https://images.pexels.com/photos/2318966/pexels-photo-2318966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt={`${recipe.title}`} />
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
