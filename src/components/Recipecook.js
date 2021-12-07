import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useCollection } from '../hooks/useCollection'
import { useLoading } from '../hooks/useLoading';
import useMounted from '../hooks/useMounted';
import { useTheme } from '../hooks/useTheme';
import "./css/Recipecook.css"

const Recipecook = () => {
  const { mode } = useTheme();
  const { setContentIsReady } = useLoading();
  const navigate = useNavigate()
  const { documents: recipeList } = useCollection('recipe_list');
  const { recipeid } = useParams();
  const recipe = recipeList && recipeList.find((element) => element.id === recipeid)
  const [remountCount, setRemountCount] = useState(0)
  const mountedStatus = useMounted();

  useEffect(() => {
    setTimeout(() => {
      if (mountedStatus.current)
        setRemountCount(1);
    }, 500)
  }, [setRemountCount, mountedStatus])

  useEffect(() => {
    if (remountCount === 1 && recipeList === null)
      setContentIsReady(false)
    else if (recipeList)
      setContentIsReady(true)

  }, [recipeList, setContentIsReady, remountCount])

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
              <img src={`${recipe.recipeImageUrl}`} alt={`${recipe.title}`} />
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
