import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import './css/UploadProgress.css'

const UploadProgress = ({ uploadStatus }) => {
  const { mode } = useTheme()
  const [status, setStatus] = useState('0 %');
  const [process, setProcess] = useState(false);
  const progressBar = useRef();

  useEffect(() => {
    setStatus(`0 %`)
  }, [])

  useEffect(() => {
    progressBar.current.style.setProperty('transform', `scaleX(${Number(status.slice(0, -1)) / 100})`)
    if (uploadStatus.progress < 100) {
      setProcess(false)
      setTimeout(() => {
        const statusInt = Number(status.slice(0, -1))
        const range = Math.floor(Math.random() * (95 - statusInt) + statusInt)
        setStatus(`${range} %`)
      }, 3000)
    }
    else if (uploadStatus.progress === 100) {
      setProcess(true)
    }
  }, [uploadStatus, status])

  return (
    <div className={`uploadContainer ${mode}`} >
      <p>Uploading image...</p>
      <div className="uploadStatus">
        <div className="progressBar">
          <div ref={progressBar} className="solidBar"></div>
        </div>
        {process ?
          <div className="uploadpercent">Processing...</div> :
          <div className="uploadpercent">{status}</div>
        }
      </div>
    </div >
  )
}

export default UploadProgress
