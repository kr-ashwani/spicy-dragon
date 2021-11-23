import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import './css/Signin.css'
import { useAuth } from '../context/AuthContext';
import LoginWithPopUp from './LoginWithPopup';
import { CircularProgress } from '@mui/material';
import { useModal } from '../hooks/useModal';

const Signin = ({ islogin, setisLogin, forgotPassword, setForgotPassword }) => {
  const { setOpenModal, openModal } = useModal();

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { navColor } = useTheme();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: ""
  });
  const [message, setMessage] = useState({
    error: null
  });

  useEffect(() => {
    setMessage({
      error: null
    });
  }, [values])

  const { email, password } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, error: "" })
      setIsLoading(!isLoading)
      await login(values.email, values.password);

      setOpenModal(!openModal)
    }
    catch (err) {
      setIsLoading((loading) => !loading)
      return setMessage({ ...message, error: `${err.code.replace("auth/", '')}` })
    }
  }

  return (
    <div className="loginForm login">
      <form onSubmit={handleSubmit} >
        <h1>Sign in</h1>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input required autoComplete="off" name="email" onChange={handleChange("email")} value={email} type="email" id="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password:</label>
          <input required autoComplete="off" name="password" onChange={handleChange("password")} value={password} type="password" id="password" />
        </div>
        <div className="field forgotPassword">
          <p onClick={() => setForgotPassword(!forgotPassword)}>Forgot Password?</p>
        </div>
        {message.error && <div className="loginError"> <p>{message.error}</p></div>}
        {
          !isLoading
            ? <button className="signin" style={{ backgroundColor: `${navColor}`, color: "#fff" }} >Sign in</button> :
            <button disabled className="signin loading" style={{ width: "72px", height: "30px", backgroundColor: `${navColor}40`, color: "#fff" }} ><CircularProgress style={{ width: "15px", height: "15px" }} /></button>
        }

        <p className="createAcc">Create new Account ? <span onClick={() => setisLogin(!islogin)}>Sign Up</span></p>
      </form>
      <div className="googleSignin">
        <p>or</p>
        <LoginWithPopUp message={message} setMessage={setMessage} />
      </div>
    </div >
  )
}

export default Signin
