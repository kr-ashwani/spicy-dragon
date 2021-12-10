import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import './css/UploadProgress.css'

const UploadProgress = ({ uploadStatus, setUploadStatus }) => {
  const { mode } = useTheme()
  const [status, setStatus] = useState(0);
  const [process, setProcess] = useState(false);
  const progressBar = useRef();
  const updateStatusTimer = useRef(null);

  useEffect(() => {
    return () => setUploadStatus({ progress: 0, state: '' })
  }, [setUploadStatus])

  useEffect(() => {
    if (uploadStatus.progress === 0 && !uploadStatus.state) {
      setStatus(0)
      updateStatusTimer.current = setInterval(() => {
        if (uploadStatus.progress < 100)
          setStatus(status => Math.floor(Math.random() * (95 - status) + status + 1))
      }, 1000)
    }
    else if (uploadStatus.state === 'uploaded')
      clearInterval(updateStatusTimer.current)
  }, [uploadStatus, status])

  useEffect(() => {
    progressBar.current.style.setProperty('transform', `scaleX(${status / 100})`)
    if (uploadStatus.progress < 100)
      setProcess(false)
    else if (uploadStatus.progress === 100 && uploadStatus.state === 'running')
      setStatus(100)
    else if (uploadStatus.state === 'uploaded')
      setProcess(true)

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
          <div className="uploadpercent">{status} %</div>
        }
      </div>
    </div >
  )
}

export default UploadProgress
