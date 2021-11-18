import React from 'react'
import { useCollection } from '../hooks/useCollection'
import { useTheme } from '../hooks/useTheme';
import "./css/Restaurant.css"
import Recipe from './Recipe';
// import "./database.js"

const Restaurant = ({ searchTerm }) => {
  const { mode } = useTheme();
  const { documents: recipeList } = useCollection('recipe_list');
  let filteredList = recipeList && recipeList.filter(({ recipe }) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    recipeList && (<div className={`recipelist ${mode}`} >
      {
        filteredList.map(({ recipe, id }) => {
          return <Recipe key={id} recipe={recipe} id={id} />
        })
      }
    </div >)
  )
}

export default Restaurant

