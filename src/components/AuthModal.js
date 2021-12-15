import React from 'react'
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import './css/AuthModal.css'

const AuthModal = ({ message }) => {
  const { openModal, setOpenModal } = useModal();
  const { navColor } = useTheme();

  function closeModal(e) {
    e.preventDefault()
    setOpenModal(!openModal)
  }
  return (
    <div className='modal-info'>
      <h3 >Permission Alert</h3>
      <p>{message}</p>
      <p>Please contact Ashwani😎 for admin role.</p>
      <button onClick={closeModal} style={{ backgroundColor: `${navColor}` }}>OK</button>
    </div >
  )
}

export default AuthModal
