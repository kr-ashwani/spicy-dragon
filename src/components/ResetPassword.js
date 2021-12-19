import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { useQuery } from "../hooks/useQuery";
import Alert from "./Alert";
import "./css/NewPassword.css";
import { CircularProgress } from "@mui/material";
import { useLoading } from "../hooks/useLoading";

const ResetPassword = () => {
  const { setContentIsReady } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();
  const { resetPassword } = useAuth();
  const { navColor, mode } = useTheme();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({
    success: null,
    error: null,
  });

  useEffect(() => {
    setMessage({
      success: null,
      error: null,
    });
  }, [values]);

  useEffect(() => {
    setContentIsReady(true);
  }, [setContentIsReady]);

  const { password, confirmPassword } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword)
      return setMessage({ ...message, warning: "Password do not Match" });
    if (!password.trim() || !confirmPassword.trim()) {
      switch (false) {
        case Boolean(password.trim()):
          return setMessage({ ...message, warning: "Password field is empty" });
        case Boolean(confirmPassword.trim()):
          return setMessage({
            ...message,
            warning: "Confirm password field is empty",
          });
        default:
      }
    }
    try {
      setIsLoading(!isLoading);
      await resetPassword(query.get("oobCode"), password);
      setMessage({ ...message, success: "Password updated successfully" });
      setIsLoading((loading) => !loading);
      window.location.replace(query.get("continueUrl"));
    } catch (error) {
      setIsLoading((loading) => !loading);
      setMessage({ ...message, error: error.code.replace("auth/", "") });
    }
  }

  return (
    <div className="recipeform resetPassword">
      <form onSubmit={handleSubmit}>
        <h2 className={`${mode}`}>Password Reset</h2>
        <div className="field">
          <label className={`${mode}`} htmlFor="password">
            New Password:
          </label>
          <input
            required
            autoComplete="off"
            name="password"
            onChange={handleChange("password")}
            value={password}
            type="password"
            id="password"
          />
        </div>
        <div className="field">
          <label className={`${mode}`} htmlFor="confirmPassword">
            Confirm New Password:
          </label>
          <input
            required
            autoComplete="off"
            onChange={handleChange("confirmPassword")}
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <Alert message={message} />
        {!isLoading ? (
          <button
            style={{ backgroundColor: `${navColor}`, color: "#fff" }}
            className="submit"
          >
            Reset password
          </button>
        ) : (
          <button
            disabled
            className="signin loading"
            style={{
              margin: "auto",
              width: "150px",
              height: "32px",
              backgroundColor: `${navColor}40`,
              color: "#fff",
            }}
          >
            <CircularProgress
              style={{ marginTop: "3px", width: "15px", height: "15px" }}
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
