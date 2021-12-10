import React, { useState, useContext, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, confirmPasswordReset } from "@firebase/auth";
import { auth, db } from "../firebase/firebaseConfig"
import { doc, getDoc, Timestamp, updateDoc } from "@firebase/firestore";

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState({ currentUser: null, authIsReady: false });

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  function logOut() {
    return signOut(auth)
  }
  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/"
    });
  }
  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser({ currentUser: user, authIsReady: true })
      console.log("onAuthStateChanged user :- ", user);
      try {
        if (user) {
          async function lastLoginUpdate() {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              updateDoc(doc(db, "users", user.uid), {
                lastSignInTime: Timestamp.fromDate(new Date())
              })
            }
          }
          lastLoginUpdate();
        }
      }
      catch (error) {
        console.log("Failed to updated user's lastSignInTime ", error.message);
      }
    })
    return unSubscribe
  }, [])

  const value = {
    ...user,
    login,
    signup,
    logOut,
    loginWithGoogle,
    forgotPassword,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }