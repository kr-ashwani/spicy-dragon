import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import "./css/Navbar.css"
import LoginModal from './LoginModal';
import LoginAlertModal from './LoginAlertModal';
import Modal from './Modal';
import UserAvatar from './UserAvatar';

const Navbar = ({ setSearchTerm }) => {
  const { currentUser } = useAuth();
  const { openModal, setOpenModal, modalContent, setModalContent } = useModal();
  const { navColor } = useTheme();
  const navigate = useNavigate();
  const search = useRef();

  useEffect(() => {
    setModalContent(<LoginModal />)
  }, [setModalContent])


  function addRecipe() {
    navigate('/createrecipe')
    if (!currentUser) {
      setTimeout(() => {
        setModalContent(<LoginAlertModal />)
        setOpenModal(!openModal)
        setTimeout(() => navigate('/'), 300)
      }, 400)
    }
  }

  return (
    <nav style={{ backgroundColor: `${navColor}` }}>
      <div className="navbar">
        <div className="logo">
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Spicy Dragon</h1>
        </div>
        <div className="nav_search">
          <label htmlFor="search">Search: </label>
          <input onChange={() => { setSearchTerm(search.current.value); }} ref={search} type="text" id="search" />
          {openModal && <Modal >{modalContent}</Modal>}
          <button className="addRecipe" style={{ backgroundColor: `${navColor}` }} onClick={addRecipe}>Add Recipe</button>
          {!currentUser && <button style={{ backgroundColor: `${navColor}` }} onClick={() => { setModalContent(<LoginModal />); setOpenModal(!openModal) }}>Login</button>}
          {currentUser && < UserAvatar />}
        </div>
      </div>
    </nav >
  )
}

export default Navbar
