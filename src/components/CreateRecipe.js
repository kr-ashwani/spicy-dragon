import { addDoc, arrayUnion, collection, doc, Timestamp, updateDoc } from '@firebase/firestore';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { useTheme } from '../hooks/useTheme';
import Alert from './Alert';
import './css/CreateRecipe.css'

const CreateRecipe = () => {
  const location = useLocation()
  const { navColor, mode } = useTheme();
  const { currentUser } = useAuth()
  const { recipeid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const ingref = useRef();
  const addRef = useRef();

  const [values, setValues] = useState({
    title: "",
    ingredients: [],
    method: '',
    time: 1,
    imageUrl: ''
  })
  const [message, setMessage] = useState({
    success: null,
    error: null,
    warning: null,
    recipeRepeat: false
  });

  useEffect(() => {
    var r = document.querySelector(':root');
    r.style.setProperty('--navColor', `${navColor}`);

  }, [navColor])

  useEffect(() => {
    console.log("Recipeid :- ", recipeid);
    if (!recipeid) {
      setValues({
        title: "",
        ingredients: [],
        method: '',
        time: 1,
        imageUrl: ''
      })
      return
    }
    async function getRecipe() {
      const recipeData = location.state;
      setValues({
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        method: recipeData.method,
        time: recipeData.time,
      })
    }
    getRecipe()

  }, [recipeid, location]);

  useEffect(() => {
    setMessage({
      success: null,
      error: null,
      warning: null,
      recipeRepeat: false
    });
  }, [values])

  const { title, method, time, ingredients, imageUrl } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  function addItem(e) {
    if (e.target !== addRef.current)
      return
    e.preventDefault();
    ingref.current.focus();
    if (!ingref.current.value.trim())
      return;
    if (ingref.current.value)
      setValues({ ...values, ingredients: [...ingredients, ingref.current.value.trim()] })
    ingref.current.value = "";
  }

  function deleteItem(e) {
    e.preventDefault();
    ingref.current.focus();
    ingredients.pop();
    setValues({ ...values, ingredients: ingredients })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (message.recipeRepeat)
      return setMessage({ ...message, success: '', error: 'Resubmitting same recipe is not allowed' })
    if (!title.trim() || !method.trim() || !ingredients.length || !imageUrl.length) {
      switch (false) {
        case Boolean(title.trim()):
          return setMessage({ ...message, warning: "Title field is empty" })
        case Boolean(ingredients.length):
          return setMessage({ ...message, warning: "Requires atleast one Ingredient" })
        case Boolean(method.trim()):
          return setMessage({ ...message, warning: "Method field is empty" })
        case Boolean(time):
          return setMessage({ ...message, warning: "Time field is empty" })
        case Boolean(imageUrl.trim()):
          return setMessage({ ...message, warning: "Upload recipe image" })
        default:
      }
    }
    const recipeRef = collection(db, 'recipe_list')
    if (recipeid) {
      try {
        setIsLoading(!isLoading)
        const lastEditedTime = Timestamp.fromDate(new Date())
        await updateDoc(doc(db, 'recipe_list', recipeid), { ...values, lastEditedTime })

        setMessage({ ...message, success: "Recipe successfully edited!", recipeRepeat: true })
        setIsLoading((loading) => !loading)
      }
      catch (err) {
        setIsLoading((loading) => !loading)
        setMessage({ ...message, error: err.message })
      }
      return;
    }
    try {
      setIsLoading(!isLoading)
      let createdTime = Timestamp.fromDate(new Date())
      const lastEditedTime = Timestamp.fromDate(new Date())
      let authorUid = currentUser.uid;
      const recipeDoc = await addDoc(recipeRef, { ...values, createdTime, authorUid, lastEditedTime })

      await updateDoc(doc(db, "users", currentUser.uid), {
        recipeAdded: arrayUnion(recipeDoc.id)
      })
      // await setDoc(doc(db, "recipe_list", currentUser.uid), { ...recipeData, createdTime })
      setMessage({ ...message, success: "Recipe successfully added!", recipeRepeat: true })
      setIsLoading((loading) => !loading)
    }
    catch (err) {
      setIsLoading((loading) => !loading)
      setMessage({ ...message, error: err.message })
    }
  }

  return (
    <div className="recipeform" onSubmit={handleSubmit}>
      <form >
        <h2 className={`${mode}`}>Add a New Recipe</h2>
        <div className="field">
          <label className={`${mode}`} htmlFor="title">Recipe title:</label>
          <input name="title" onChange={handleChange("title")} value={title} type="text" id="title" />
        </div>
        <div className="field">
          <label className={`${mode}`} htmlFor="ingredients" name="ingredients">Recipe Ingredients</label>
          <div>
            <input ref={ingref} type="text" id="ingredients" />
            <button ref={addRef} className="addButton" style={{ backgroundColor: `${navColor}`, color: "#fff" }} onClick={addItem}>
              add
              {ingredients.length ?
                (<div className="deleteButton" onClick={deleteItem} style={{ backgroundColor: `${navColor}`, color: "#fff" }}>
                  <i className="fas fa-minus"></i>
                </div>) : null}
            </button>
          </div>
          <p className={`label ${mode}`} style={{ paddingRight: "50px" }}>Current ingredients: {ingredients.join(', ')}</p>
        </div >
        <div className="field">
          <label className={`${mode}`} htmlFor="method">Recipe Method:</label>
          <textarea onChange={handleChange("method")} value={method} form="recipeform" id="method">
          </textarea>
        </div>
        <div className="field">
          <label className={`${mode}`} htmlFor="time">Cooking time (minutes):</label>
          <input onChange={handleChange("time")} value={time} type="number" min="1" max="10000" id="time" />
        </div>
        <div className="field">
          <label className={`${mode}`} htmlFor="recipeImage">Recipe image:</label>
          <input className={`${mode}`} accept="image/*" onChange={handleChange("imageUrl")} value={imageUrl} type="file" id="recipeImage" />
        </div>
        <Alert message={message} />
        {
          !isLoading ?
            <button style={{ backgroundColor: `${navColor}`, color: "#fff" }} className="submit" >submit</button>
            : <button disabled className="signin loading" style={{ margin: "auto", width: "72px", height: "32px", backgroundColor: `${navColor}40`, color: "#fff" }} ><CircularProgress style={{ marginTop: "8px", width: "15px", height: "15px" }} /></button>
        }
      </form >
    </div >
  )
}

export default CreateRecipe
