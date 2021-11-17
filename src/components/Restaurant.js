import React from 'react'
import { useCollection } from '../hooks/useCollection'
import "./css/Restaurant.css"
import Recipe from './Recipe';
// import "./database.js"

const Restaurant = ({ searchTerm, navColor }) => {
  const { documents: recipeList } = useCollection('recipe_list');
  let filteredList = recipeList && recipeList.filter(({ recipe }) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    recipeList && (<div className="recipelist">
      {filteredList.map(({ recipe, id }) => {
        return <Recipe key={id} recipe={recipe} id={id} navColor={navColor} />
      })}
    </div>)
  )
}

export default Restaurant

