import React from 'react'
import './css/Guest.css'
import security from '../assets/Security.svg'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const Guest = () => {
  const { mode } = useTheme()
  return (
    <div className="GuestContainer">
      <Link className={`${mode}`} to="/"><h1>Please Login</h1></Link>
      <img src={security} alt="security" />
    </div >
  )
}

export default Guest
