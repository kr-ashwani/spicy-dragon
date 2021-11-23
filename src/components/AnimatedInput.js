
import { doc, updateDoc } from '@firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase/firebaseConfig';
import { useTheme } from '../hooks/useTheme';
import "./css/AnimatedInput.css"

const AnimatedInput = ({ user, value: display, type }) => {
  const [value, setValue] = useState('')
  const { navColor, mode } = useTheme()
  const [action, setAction] = useState("edit")
  const penRef = useRef()
  const checkRef = useRef()
  const borderRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    setValue(user[display])
  }, [user, display])


  function handleEdit(e) {
    if (action === 'save') {
      if (value === null)
        return
      if (!value.trim())
        return
    }
    if (action === "save") {
      if (!(user[display] === value.trim()))
        updateDoc(doc(db, 'users', user.uid), { [display]: value })
    }
    if (action === "edit") {
      inputRef.current.disabled = false
      inputRef.current.focus()
      penRef.current.classList.add('hide');
      penRef.current.classList.remove('hide-reverse');
      checkRef.current.classList.add('hide');
      checkRef.current.classList.remove('hide-reverse');
      borderRef.current.classList.add('active');
      borderRef.current.classList.remove('active-reverse');
      setAction("save")
    }
    else {
      inputRef.current.disabled = true
      penRef.current.classList.remove('hide');
      penRef.current.classList.add('hide-reverse');
      checkRef.current.classList.remove('hide');
      checkRef.current.classList.add('hide-reverse');
      borderRef.current.classList.remove('active');
      borderRef.current.classList.add('active-reverse');
      setAction("edit")
    }
  }

  const handleChange = name => event => {
    setValue(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault()
    if (event.type === 'submit')
      handleEdit(event)
  }
  return (
    <div className="animatedInput">
      <form onSubmit={handleSubmit}>
        <input className={`animatedInput ${mode}`} disabled ref={inputRef} type={type} value={value ? value : ""} onChange={handleChange(display)} />
      </form>
      <div ref={borderRef} className="border" style={{ backgroundColor: navColor }}></div>
      <i ref={penRef} onClick={handleEdit} className="fas fa-pen"></i>
      <i ref={checkRef} onClick={handleEdit} className="fas fa-check"></i>
    </div>
  )
}

export default AnimatedInput
