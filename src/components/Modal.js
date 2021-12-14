import React, { useEffect, useRef } from 'react'
import { useModal } from '../hooks/useModal';
import './css/LoginModal.css'

const LoginModal = ({ children }) => {
  const { openModal, setOpenModal } = useModal();
  let container = useRef();

  useEffect(() => {

    const unSub = function (e) {
      if (e.target === container.current)
        setOpenModal(!openModal)
    }
    document.body.addEventListener('click', unSub);
    return () => {
      document.body.removeEventListener('click', unSub);
    }
  }, [openModal, setOpenModal]);

  return (
    <div ref={container} className="modalContainer">
      {children}
    </div >
  )
}

export default LoginModal
