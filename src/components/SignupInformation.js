import { doc, setDoc, Timestamp } from '@firebase/firestore';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase/firebaseConfig';
import { useModal } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import "../components/css/SigninInformation.css"
import { getDownloadURL, ref } from '@firebase/storage';

const SigninInformation = ({ userInfo }) => {
  const { setOpenModal, openModal } = useModal();
  const userNameRef = useRef()

  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { navColor } = useTheme();

  useEffect(() => {
    userNameRef.current.focus();
  }, [])

  const [values, setValues] = useState({
    userName: "",
    gender: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState({
    error: null
  });

  useEffect(() => {
    setMessage({
      error: null
    });
  }, [values])

  const { phoneNumber, userName } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!values.gender)
        return setMessage({ ...message, error: `Gender field is empty` })
      setValues({ ...values, error: "" })
      setIsLoading(!isLoading)
      let imgPath = values.gender === 'male' ? `cartoon avatars/men${Math.floor(Math.random() * 8 + 1)}.jpeg` : `cartoon avatars/woman${Math.floor(Math.random() * 8 + 1)}.jpeg`;

      const imgUrl = await getDownloadURL(ref(storage, imgPath))
      const userCredentials = await signup(userInfo.email, userInfo.password);
      const user = userCredentials.user;
      const userData = {
        email: user.email,
        userName,
        phoneNumber,
        uid: user.uid,
        photoURL: imgUrl,
        creationTime: Timestamp.fromDate(new Date()),
        lastSignInTime: Timestamp.fromDate(new Date()),
        recipeAdded: null
      }
      await setDoc(doc(db, "users", user.uid), userData)
      setOpenModal(!openModal)
    }
    catch (err) {
      setIsLoading((loading) => !loading)
      return setMessage({ ...message, error: `${err.code.replace("auth/", '')}` })
    }
  }

  return (
    <div className="loginForm signup">
      <form onSubmit={handleSubmit} className="signinInfoForm">
        <h1>Sign up</h1>
        <div className="field signInfo">
          <label htmlFor="userName">Name: </label>
          <input ref={userNameRef} style={{ fontSize: "1rem", marginLeft: "0" }} required autoComplete="off" onChange={handleChange("userName")} value={userName} type="text" id="userName" />
        </div>
        <div className="field signInfo">
          <label htmlFor="phoneNumber">Phone Number(optional): </label>
          <input style={{ margin: "5px", marginLeft: "0" }} autoComplete="off" onChange={handleChange("phoneNumber")} value={phoneNumber} type="number" id="phoneNumber" />
        </div>
        <div className="field signInfo" required onChange={(e) => { setValues({ ...values, gender: e.target.value }) }}>
          <label htmlFor="gender">Gender: </label>
          <div className="genderInput" >
            <div className="male">
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male">Male</label>
            </div>
            <div className="female">
              <input type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        {message.error && <div className="loginError"> <p>{message.error}</p></div>}
        {
          !isLoading ?
            <button className="signin" style={{ backgroundColor: `${navColor}`, color: "#fff" }} >Sign up</button> :
            <button disabled className="signin loading" style={{ width: "72px", height: "30px", backgroundColor: `${navColor}40`, color: "#fff" }} ><CircularProgress style={{ width: "15px", height: "15px" }} /></button>
        }
      </form >
    </div >
  )
}


export default SigninInformation
