import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { db } from '../firebase/firebaseConfig';
import { useLoading } from '../hooks/useLoading';
import useMounted from '../hooks/useMounted';
import { useTheme } from '../hooks/useTheme';
import { useDoc } from '../hooks/useDoc';
import "./css/Recipecook.css"

const Recipecook = () => {
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const { mode } = useTheme();
  const { setContentIsReady } = useLoading();
  const navigate = useNavigate();
  const { recipeid } = useParams();
  const { document: recipe } = useDoc('recipe_list', recipeid)
  const [remountCount, setRemountCount] = useState(0)
  const mountedStatus = useMounted();
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (mountedStatus.current)
        setRemountCount(1);
    }, 500)
  }, [setRemountCount, mountedStatus])

  useEffect(() => {
    async function helperName() {
      if (recipe.createdTime.seconds === recipe.lastEditedTime.seconds) {
        const docSnap = await getDoc(doc(db, 'users', recipe.authorUid));
        setDisplayName(docSnap.data().userName.split(' ')[0]);
      }
      else {
        const docSnap = await getDoc(doc(db, 'users', recipe.editedAuthorUid));
        setDisplayName(docSnap.data().userName.split(' ')[0]);
      }
    }
    if (recipe)
      helperName()
  }, [recipe])

  useEffect(() => {
    if (remountCount === 1 && recipe === null)
      setContentIsReady(false)
    else if (recipe)
      setContentIsReady(true)

  }, [recipe, setContentIsReady, remountCount])

  function edit() {
    navigate(`/createrecipe/${recipeid}`, { state: recipe })
  }

  return (
    recipe ? (
      <div className="foodContainer">
        <div className={`food_des ${mode}`} >
          <div className="food_card">
            <h2>{recipe.title}</h2>
            <p className={`${mode}`}>{recipe.time} minutes to make</p>
            <div className="recipecook_img">
              <img src={`${recipe.recipeImageUrl}`} alt={`${recipe.title}`} />
            </div>
            {
              (recipe.createdTime.seconds === recipe.lastEditedTime.seconds) ?
                <p>Created on {`${monthName[recipe.createdTime.toDate().getMonth()]} ${recipe.createdTime.toDate().getDate()},${recipe.createdTime.toDate().getFullYear()}`} by {displayName}</p> :
                <p>Updated on {`${monthName[recipe.lastEditedTime.toDate().getMonth()]} ${recipe.lastEditedTime.toDate().getDate()},${recipe.lastEditedTime.toDate().getFullYear()}`} by {displayName}</p>
            }
            <p>{recipe.ingredients.join(', ')}</p>
            <p >{recipe.method}</p>
          </div>
          <i onClick={edit} className="fas fa-pen"></i>
        </div>
      </div>) :
      <></>
  )
}

export default Recipecook
