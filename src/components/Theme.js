import React from 'react'
import './css/Theme.css'

const Theme = ({ setNavColor }) => {
  function themeChange(e) {
    setNavColor(e.target.classList[1]);
  }
  return (
    <div className="theme">
      <i className="fas fa-moon"></i>
      <div className="color_box">
        <div className="color purple" onClick={themeChange}></div>
        <div className="color green" onClick={themeChange}></div>
        <div className="color red" onClick={themeChange}></div>
      </div>
    </div>
  )
}

export default Theme
