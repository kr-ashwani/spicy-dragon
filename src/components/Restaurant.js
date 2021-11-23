import React from 'react'
import { useCollection } from '../hooks/useCollection'
import { useTheme } from '../hooks/useTheme';
import "./css/Restaurant.css"
import Recipe from './Recipe';
// import "./database.js"

const Restaurant = ({ searchTerm }) => {
  const { mode } = useTheme();
  const { documents: recipeList } = useCollection('recipe_list');
  let filteredList = recipeList && recipeList.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))

  return (
    recipeList && (<div className={`recipelist ${mode}`} >
      {
        filteredList.map((recipe) => {
          return <Recipe key={recipe.id} recipe={recipe} id={recipe.id} />
        })
      }
    </div >)
  )
}

export default Restaurant

