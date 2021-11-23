import React, { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme';
import './css/Theme.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Theme = () => {
  const { setNavColor, navColor, setMode, mode } = useTheme();
  const location = useLocation();
  const homeButton = useRef();
  const navColorsArray = ["#57249c", "#249c6d", "#b90234"]
  const navigate = useNavigate();

  useEffect(() => {
    mode === "light" ? document.body.style.backgroundColor = "#dfdedf" : document.body.style.backgroundColor = "#1e1e1e";
  }, [mode]);

  function themeChange(color) {
    if (navColor !== color)
      setNavColor(color);
  }
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === '/resetpassword')
      homeButton.current.style.display = "none"
    else
      homeButton.current.style.display = "block"
  })

  return (
    <div className={`theme ${mode}`}>
      <i onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className="fas fa-moon" ></i >
      <div className="color_box">
        {navColorsArray.map((element) => {
          return <div className="color" key={element}
            onClick={() => themeChange(element)}></div>
        })}
      </div>
      <button ref={homeButton} onClick={() => navigate('/')} style={{ backgroundColor: `${navColor}`, color: "#fff" }} className="submit" >
        <i className="fas fa-arrow-left"></i>
      </button>
    </div >
  )
}

export default Theme
