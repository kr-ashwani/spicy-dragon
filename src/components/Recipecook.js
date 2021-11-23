import React from 'react'
import { useParams } from 'react-router';
import { useCollection } from '../hooks/useCollection'
import { useTheme } from '../hooks/useTheme';
import "./css/Recipecook.css"

const Recipecook = () => {
  const { mode } = useTheme();
  const { documents: recipeList } = useCollection('recipe_list');
  const { recipeid } = useParams();
  const recipe = recipeList && recipeList.find((element) => element.id === recipeid)
  return (
    recipeList && (
      <div className="foodContainer">
        <div className={`food_des ${mode}`} >
          <div className="food_card">
            <h2>{recipe.title}</h2>
            <p className={`${mode}`}>{recipe.time} minutes to make</p>
            <p>{recipe.ingredients}</p>
            <p >{recipe.method}</p>
          </div>
        </div>
      </div>)
  )
}

export default Recipecook
