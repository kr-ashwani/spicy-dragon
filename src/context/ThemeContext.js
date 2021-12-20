import React, { useReducer } from "react";

const ThemeContext = React.createContext();

function themeReducer(state, action) {
  switch (action.type) {
    case "CHANGE_NAV_COLOR":
      return { ...state, navColor: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}

const ThemeProvider = ({ children }) => {
  const [themeState, dispatch] = useReducer(themeReducer, {
    navColor: "#b90234",
    mode: "light",
  });

  function setNavColor(color) {
    dispatch({ type: "CHANGE_NAV_COLOR", payload: color });
  }
  function setMode(mode) {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  }

  return (
    <ThemeContext.Provider value={{ ...themeState, setMode, setNavColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
