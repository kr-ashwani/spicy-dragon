import React from 'react'
import { useAuth } from '../context/AuthContext'
import googelImg from '../assets/googleIcon.svg'
import useMounted from '../hooks/useMounted'
import { doc, setDoc, Timestamp } from '@firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useModal } from '../hooks/useModal'

const LoginWithPopUp = ({ message, setMessage }) => {
  const mounted = useMounted();
  const { openModal, setOpenModal } = useModal();
  const { loginWithGoogle } = useAuth();

  async function loginPopup() {
    try {
      const userCredentials = await loginWithGoogle();
      const user = userCredentials.user;
      console.log(user);
      const userData = {
        email: user.email,
        userName: user.displayName,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
        photoURL: user.photoURL.replace('s96-c', 's400-c'),
        creationTime: Timestamp.fromDate(new Date(user.metadata.creationTime)),
        lastSignInTime: Timestamp.fromDate(new Date()),
        recipeAdded: null
      }
      await setDoc(doc(db, "users", user.uid), userData)
      setOpenModal(!openModal)
    }
    catch (err) {
      mounted.current && setMessage({ ...message, error: `${err.code.replace("auth/", '')}` })
    }
  };
  return (
    <button onClick={loginPopup} style={{ color: "#bc4977" }} className="submit" >
      <div className="googleImg"><img src={googelImg} alt="google" /></div>
      <p>Sign in with Google</p>
    </button>
  )
}

export default LoginWithPopUp
