import React, { useState } from "react";

const LoadingContext = React.createContext();


const LoadingProvider = ({ children }) => {
  const [contentIsReady, setContentIsReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ contentIsReady, setContentIsReady }}>
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingProvider, LoadingContext }