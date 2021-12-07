import React, { useEffect } from 'react'
import Guest from './components/Guest';
import { useAuth } from './context/AuthContext';
import { useLoading } from './hooks/useLoading';


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const { setContentIsReady } = useLoading();

  useEffect(() => {
    setContentIsReady(true)
  }, [setContentIsReady])

  return (
    currentUser ? children : <Guest />
  )
}


export default PrivateRoute
