import React from 'react'
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import './css/ConfirmationAlert.css'

const ConfirmationAlert = ({ message, setDeleteRecipe, setEditRecipe }) => {
  const { openModal, setOpenModal } = useModal();
  const { navColor } = useTheme();

  function response(choice) {
    setDeleteRecipe ? setDeleteRecipe(choice) : setEditRecipe(choice);
    setOpenModal(!openModal)
  }

  return (
    <div className='modal-info'>
      <h3 >Confim choice</h3>
      <p>{message}</p>
      <div className="confirm">
        <p onClick={() => response(false)} style={{ color: `${navColor}` }}>Cancel</p>
        <p onClick={() => response(true)} style={{ color: `${navColor}` }}>OK</p>
      </div>
    </div >
  )
}

export default ConfirmationAlert
