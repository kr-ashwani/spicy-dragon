import React, { useState } from "react";

const ModalContext = React.createContext();


const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
