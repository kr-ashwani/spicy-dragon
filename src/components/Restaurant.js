import React from 'react'
import { useCollection } from '../hooks/useCollection'
import "./css/Restaurant.css"
import Recipe from './Recipe';

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


// const titleArray = recipe.title.split('');
// const searchArray = searchTerm.split('');
// console.log(titleArray, searchArray);
// let match = false;
// searchArray.forEach((element, index) => {
//   match = element === titleArray[index] ? true : false;
// });
// return match