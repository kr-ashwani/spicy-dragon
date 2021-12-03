import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { useCollection } from '../hooks/useCollection'
import { useTheme } from '../hooks/useTheme';
import "./css/Recipecook.css"

const Recipecook = () => {
  const { mode, navColor } = useTheme();
  const navigate = useNavigate()
  const { documents: recipeList } = useCollection('recipe_list');
  const { recipeid } = useParams();
  const recipe = recipeList && recipeList.find((element) => element.id === recipeid)

  function edit() {
    navigate(`/createrecipe/${recipeid}`, { state: recipe })
  }
  return (
    recipeList && (
      <div className="foodContainer">
        <div className={`food_des ${mode}`} >
          <div className="food_card">
            <h2>{recipe.title}</h2>
            <p className={`${mode}`}>{recipe.time} minutes to make</p>
            <div className="recipecook_img">
              <img src="https://images.pexels.com/photos/2318966/pexels-photo-2318966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt={`${recipe.title}`} />
            </div>
            <p>{recipe.ingredients.join(', ')}</p>
            <p >{recipe.method}</p>
          </div>
          <i onClick={edit} className="fas fa-pen"></i>
        </div>
      </div>)
  )
}

export default Recipecook
