import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import Alert from './Alert';
import "./css/ForgotPassword.css"

const ForgotPassword = ({ setForgotPassword }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const { navColor } = useTheme()
  const [values, setValues] = useState({
    email: ""
  });
  const [message, setMessage] = useState({
    success: null,
    error: null,
    warning: null
  });
  const { email } = values;
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value.trim() })
  }
  useEffect(() => {
    setMessage({
      success: "",
      error: "",
      warning: null
    });
  }, [values])
  async function sendEmail(e) {
    e.preventDefault()
    try {
      setIsLoading(!isLoading)
      await forgotPassword(email)
      setMessage({ ...message, success: "Password reset email sent!" })
      setIsLoading((loading) => !loading)
    }
    catch (err) {
      setIsLoading((loading) => !loading)
      setMessage({ ...message, error: err.code.replace('auth/', '') })
    }
  }

  return (
    <div className="passwordContainer">
      <button onClick={() => setForgotPassword(false)} style={{ backgroundColor: `${navColor}`, color: "#fff" }} className="submit" >
        <i className="fas fa-arrow-left"></i>
      </button>
      <h2>Forgot Password?</h2>
      <p>An E-mail regarding password reset will be sent. please check your inbox.</p>
      <form onSubmit={sendEmail}>
        <div className="verifyEmail">
          <Alert message={message} />
          <label htmlFor="email">Email:</label>
          <input required id="email" type="email" value={email} onChange={handleChange("email")} />
          {
            !isLoading ?
              <button className="signin" style={{ backgroundColor: `${navColor}`, color: "#fff" }} >Submit</button>
              : <button disabled className="signin loading" style={{ width: "72px", height: "30px", backgroundColor: `${navColor}40`, color: "#fff" }} ><CircularProgress style={{ width: "15px", height: "15px" }} /></button>
          }
        </div>
      </form>
    </div >
  )
}

export default ForgotPassword