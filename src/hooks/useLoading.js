import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

function useLoading() {
  const context = useContext(LoadingContext)

  if (context === undefined)
    return new Error("useLoading() must be used inside a ModalProvider");

  return context;
}

export { useLoading };
