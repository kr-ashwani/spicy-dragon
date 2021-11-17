import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import "./css/Navbar.css"
// import "./database.js"

const Navbar = ({ navColor, setSearchTerm }) => {
  const navigate = useNavigate();
  const search = useRef();

  return (
    <nav style={{ backgroundColor: `var(--${navColor})` }}>
      <div className="navbar">
        <div className="logo">
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Spicy Dragon</h1>
        </div>
        <div className="nav_search">
          <label htmlFor="search">Search: </label>
          <input onChange={() => { setSearchTerm(search.current.value); }} ref={search} type="text" id="search" />
          <button style={{ backgroundColor: `var(--${navColor})` }} onClick={() => navigate('/createrecipe')}>Add Recipe</button>
        </div>
      </div>
    </nav >
  )
}

export default Navbar
