import React, { useEffect, useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useLoading } from '../hooks/useLoading';
import { useTheme } from '../hooks/useTheme';
import "./css/Restaurant.css"
import Recipe from './Recipe';
// import "./database.js"

const Restaurant = ({ searchTerm }) => {
  const { setContentIsReady } = useLoading();
  const { mode } = useTheme();
  const { documents: recipeList } = useCollection('recipe_list');
  let filteredList = recipeList && recipeList.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))
  const [remountCount, setRemountCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setRemountCount(1);
    }, 500)
  }, [setRemountCount])

  useEffect(() => {
    if (remountCount === 1 && recipeList === null)
      setContentIsReady(false)
    else if (recipeList)
      setContentIsReady(true)

  }, [recipeList, setContentIsReady, remountCount])

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

