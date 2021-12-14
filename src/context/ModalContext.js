import React, { useState } from "react";

const ModalContext = React.createContext();


const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, modalContent, setModalContent }}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
