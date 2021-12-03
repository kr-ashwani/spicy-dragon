import React from 'react'
import Guest from './components/Guest';
import { useAuth } from './context/AuthContext';


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return (
    currentUser ? children : <Guest />
  )
}


export default PrivateRoute
