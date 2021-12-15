import { deleteDoc, doc, getDoc } from '@firebase/firestore'
import { deleteObject, ref } from '@firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { db, storage } from '../firebase/firebaseConfig'
import { useModal } from '../hooks/useModal'
import AuthModal from './AuthModal'
import LoginAlertModal from './LoginAlertModal'
import { useTheme } from '../hooks/useTheme'
import './css/Recipe.css'
import { useAuth } from '../context/AuthContext'
import ConfirmationAlert from './ConfirmationAlert'

function Recipe({ recipe, id }) {
  const { mode } = useTheme();
  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const navigate = useNavigate()
  const { navColor } = useTheme();
  const { currentUser } = useAuth();
  const { openModal, setOpenModal, setModalContent } = useModal();

  function cookFunction() {
    navigate(`/recipe/${id}`)
  }
  useEffect(() => {
    async function removeRecipe() {
      const docSnap = await getDoc(doc(db, "recipe_list", id));
      if (docSnap.exists()) {
        const recipeData = docSnap.data();
        const imgRef = ref(storage, recipeData.recipeImagePath);
        await deleteObject(imgRef)
        await deleteDoc(doc(db, 'recipe_list', id));
      }
    }
    if (deleteRecipe === true) {
      removeRecipe()
    }

  }, [deleteRecipe, id])




  async function removeRecipe() {
    try {
      if (!currentUser) {
        setModalContent(<LoginAlertModal />)
        return setOpenModal(!openModal)
      }
      const docSnap = await getDoc(doc(db, "users", currentUser.uid));
      const userData = docSnap.data()
      if (recipe.authorUid === currentUser.uid || userData.role === 'admin') {
        setModalContent(<ConfirmationAlert
          message="Are you sure you want to delete recipe ?"
          setDeleteRecipe={setDeleteRecipe}
        />)
        setOpenModal(true)
      }
      else {
        setModalContent(<AuthModal message="You can only delete your own recipe." />)
        setOpenModal(!openModal)
      }
    }
    catch (err) {
      alert("Failed to remove recipe!", err.message)
    }
  }
  function truncateString(inputString, noOfWords) {
    let arrayOfWords = inputString.trim().split(" ");
    if (arrayOfWords.length < noOfWords)
      return inputString
    const truncated = arrayOfWords.slice(0, noOfWords).join(' ').concat('...');
    return truncated;
  }
  return (
    <div className={`recipe_item ${mode}`} >
      <i onClick={removeRecipe} className="fas fa-trash-alt"></i>
      <div className="recipe_card">
        <div className="recipe_img">
          <img src={`${recipe.recipeImageUrl}`} alt={`${recipe.title}`} />
        </div>
        <p>{recipe.title}</p>
        <p className={`${mode}`}>{recipe.time} minutes to make</p>
        <p className="recipeMethod">{truncateString(recipe.method, 20)}</p>
        <button onClick={cookFunction} style={{ backgroundColor: `${navColor}`, color: "#fff" }}>Cook This</button>
      </div>
    </ div>
  )
}

export default Recipe
