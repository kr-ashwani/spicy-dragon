import React from 'react'
import "./css/Alert.css"

const Alert = ({ message }) => {
  if (message.success)
    return (
      <div className="successMessage messageInfo" >
        <i className="fas fa-check-circle"></i><span>Success</span>
        <p>{message.success}</p>
      </div >)
  else if (message.error)
    return (
      <div className="errorMessage messageInfo">
        <i className="fas fa-exclamation-circle"></i><span>Error</span>
        <p>{message.error}</p>
      </div>)

  return <p></p>
}

export default Alert
