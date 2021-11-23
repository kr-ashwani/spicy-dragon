import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import './css/Signin.css'
import './css/Signup.css'
import LoginWithPopUp from './LoginWithPopup';

const Signup = ({ islogin, setisLogin, signinInfo, setSigninInfo, setUserInfo, userInfo }) => {

  const { navColor } = useTheme();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState({
    error: null
  });

  useEffect(() => {
    setMessage({
      error: null
    });
  }, [values])

  const { email, password, confirmPassword } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword)
      return setMessage({ ...message, error: "Password do not match" })

    setUserInfo({ ...userInfo, email: email, password: password })
    setSigninInfo(!signinInfo)
  }

  return (
    <div className="loginForm signup">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input required autoComplete="off" name="email" onChange={handleChange("email")} value={email} type="email" id="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password:</label>
          <input required autoComplete="off" name="password" onChange={handleChange("password")} value={password} type="password" id="password" />
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input required autoComplete="off" name="confirmPassword" onChange={handleChange("confirmPassword")} value={confirmPassword} type="password" id="confirmPassword" />
        </div>
        {message.error && <div className="loginError"> <p>{message.error}</p></div>}
        <button className="signin" style={{ backgroundColor: `${navColor}`, color: "#fff" }} >Sign up</button>
        <p className="createAcc">Already Have an Account ? <span onClick={() => setisLogin(!islogin)}>Log in</span></p>
      </form>
      <div className="googleSignin">
        <p>or</p>
        <LoginWithPopUp message={message} setMessage={setMessage} />
      </div>
    </div>)
}

export default Signup
