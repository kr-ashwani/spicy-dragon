import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import "./css/Navbar.css"
import LoginModal from './LoginModal';
import UserAvatar from './UserAvatar';

const Navbar = ({ setSearchTerm }) => {
  const { currentUser } = useAuth();
  const { openModal, setOpenModal } = useModal();
  const { navColor } = useTheme();
  const navigate = useNavigate();
  const search = useRef();


  return (
    <nav style={{ backgroundColor: `${navColor}` }}>
      <div className="navbar">
        <div className="logo">
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Spicy Dragon</h1>
        </div>
        <div className="nav_search">
          <label htmlFor="search">Search: </label>
          <input onChange={() => { setSearchTerm(search.current.value); }} ref={search} type="text" id="search" />
          {openModal && <LoginModal setOpenModal={setOpenModal} openModal={openModal} />}
          <button className="addRecipe" style={{ backgroundColor: `${navColor}` }} onClick={() => navigate('/createrecipe')}>Add Recipe</button>
          {!currentUser && <button style={{ backgroundColor: `${navColor}` }} onClick={() => { setOpenModal(!openModal) }}>Login</button>}
          {currentUser && < UserAvatar />}
        </div>
      </div>
    </nav >
  )
}

export default Navbar
