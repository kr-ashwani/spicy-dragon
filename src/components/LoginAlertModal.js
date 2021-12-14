import React from 'react'
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import './css/AuthModal.css'

const AuthModal = () => {
  const { openModal, setOpenModal } = useModal();
  const { navColor } = useTheme();

  function closeModal(e) {
    e.preventDefault()
    setOpenModal(!openModal)
  }
  return (
    <div className='modal-info'>
      <h3 >Login Alert</h3>
      <p>Guest can only read recipes.</p>
      <p>Please login to add,edit or remove recipe 🤗.</p>
      <button onClick={closeModal} style={{ backgroundColor: `${navColor}` }}>OK</button>
    </div >
  )
}

export default AuthModal
