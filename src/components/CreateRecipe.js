import { addDoc, collection } from '@firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase/firebaseConfig';
import Alert from './Alert';
import './css/CreateRecipe.css'

const CreateRecipe = ({ navColor }) => {
  let ingref = useRef();
  const [values, setValues] = useState({
    title: "",
    ingredients: "",
    method: '',
    time: 1,
    count: 0
  })
  const [message, setMessage] = useState({
    success: null,
    error: null,
    warning: null,
    recipeRepeat: false
  });

  useEffect(() => {
    setMessage({
      success: null,
      error: null,
      warning: null,
      recipeRepeat: false
    });
  }, [values])

  const { title, method, time, ingredients } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  function addItem(e) {
    e.preventDefault();
    ingref.current.focus();
    const concatIngredient = ingredients ? ingref.current.value.trim() ? `${ingredients}, ${ingref.current.value.trim()}` : ingredients : ingref.current.value.trim();

    if (ingref.current.value)
      setValues({ ...values, ingredients: `${concatIngredient}` })
    ingref.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (message.recipeRepeat)
      return setMessage({ ...message, success: '', error: 'Resubmitting same recipe is not allowed' })
    if (!title.trim() || !method.trim() || !ingredients.trim()) {
      switch (false) {
        case Boolean(title.trim()):
          return setMessage({ ...message, warning: "Title field is empty" })
        case Boolean(ingredients):
          return setMessage({ ...message, warning: "Requires atleast one Ingredient" })
        case Boolean(method.trim()):
          return setMessage({ ...message, warning: "Method field is empty" })
        case Boolean(time.trim()):
          return setMessage({ ...message, warning: "Time field is empty" })
        default:
      }
    }
    const ref = collection(db, 'recipe_list')
    try {
      await addDoc(ref, {
        recipe: values
      })
      setMessage({ ...message, success: "Recipe successfully added!", recipeRepeat: true })
    }
    catch (err) {
      setMessage({ ...message, error: err.message })
    }
  }

  return (
    <div className="recipeform" onSubmit={handleSubmit}>
      <form >
        <h2>Add a New Recipe</h2>
        <div className="field">
          <label htmlFor="title">Recipe title:</label>
          <input name="title" onChange={handleChange("title")} value={title} type="text" id="title" />
        </div>
        <div className="field">
          <label htmlFor="ingredients" name="ingredients">Recipe Ingredients</label>
          <div>
            <input ref={ingref} type="text" id="ingredients" />
            <button style={{ backgroundColor: `${navColor}`, color: "#fff" }} onClick={addItem}>add</button>
          </div>
          <p className="label">Current ingredients: {ingredients}</p>
        </div >
        <div className="field">
          <label htmlFor="method">Recipe Method:</label>
          <textarea onChange={handleChange("method")} value={method} form="recipeform" name="method">
          </textarea>
        </div>
        <div className="field">
          <label htmlFor="time">Cooking time (minutes):</label>
          <input onChange={handleChange("time")} value={time} type="number" min="1" max="10000" name="time" />
        </div>
        <Alert message={message} />
        <button style={{ backgroundColor: `${navColor}`, color: "#fff" }} className="submit" >submit</button>
      </form >
    </div >
  )
}

export default CreateRecipe
