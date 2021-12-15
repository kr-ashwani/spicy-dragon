import React, { useEffect } from 'react'
import { useLoading } from '../hooks/useLoading';
import { useRecipeList } from '../hooks/useRecipeList';
import { useTheme } from '../hooks/useTheme';
import "./css/Restaurant.css"
import DummyContent from './DummyContent';
import Recipe from './Recipe';
// import "./database.js"

const Restaurant = ({ searchTerm }) => {
  const { setContentIsReady } = useLoading();
  const { mode } = useTheme();
  const { recipeList } = useRecipeList()
  let filteredList = recipeList && recipeList.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))

  useEffect(() => {
    setContentIsReady(false)
  }, [setContentIsReady])

  useEffect(() => {
    if (recipeList)
      setContentIsReady(true)
  }, [recipeList, setContentIsReady])

  return (
    recipeList ? (<div className={`recipelist ${mode}`} >
      {
        filteredList.map((recipe) => {
          return <Recipe key={recipe.id} recipe={recipe} id={recipe.id} />
        })
      }
    </div >) :
      <DummyContent />
  )
}

export default Restaurant

