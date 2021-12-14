import React, { useEffect, useState } from 'react'
import { useLoading } from '../hooks/useLoading';
import useMounted from '../hooks/useMounted';
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

