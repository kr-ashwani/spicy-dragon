import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { useCollection } from '../hooks/useCollection'
import "./css/Recipecook.css"

const Recipecook = () => {
  const { documents: recipeList } = useCollection('recipe_list');
  const { recipeid } = useParams();
  const navigate = useNavigate();
  const recipe = recipeList && recipeList.find((element) => element.id === recipeid).recipe
  return (
    recipeList && (
      <div className="food_des" >
        <i onClick={() => navigate('/')} className="fas fa-arrow-left"></i>
        <div className="food_card">
          <h2>{recipe.title}</h2>
          <p>{recipe.time} minutes to make</p>
          <p>{recipe.ingredients}</p>
          <p >{recipe.method}</p>
        </div>
      </div>)
  )
}

export default Recipecook
