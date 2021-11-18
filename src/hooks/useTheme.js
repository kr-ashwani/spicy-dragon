import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined)
    return new Error("useTheme() must be used inside a ThemeProvider");

  return context;
}

export { useTheme };
