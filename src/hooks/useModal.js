import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

function useModal() {
  const context = useContext(ModalContext)

  if (context === undefined)
    return new Error("useModal() must be used inside a ModalProvider");

  return context;
}

export { useModal };
