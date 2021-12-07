import React, { useEffect, useRef } from 'react'
import { useLoading } from '../hooks/useLoading'
import { useTheme } from '../hooks/useTheme'
import './css/Loading.css'

const Loading = () => {
  const { contentIsReady } = useLoading();
  const { mode } = useTheme()
  const loadingContainerRef = useRef()

  useEffect(() => {
    const circleArray = Array.from(loadingContainerRef.current.childNodes[0].children)
    if (mode === 'dark') {
      loadingContainerRef.current.classList.add('dark')
      circleArray.forEach((element) => {
        element.classList.add('dark')
      })
    }
    else {
      loadingContainerRef.current.classList.remove('dark')
      circleArray.forEach((element) => {
        element.classList.remove('dark')
      })
    }
    if (contentIsReady) {
      loadingContainerRef.current.classList.remove('started')
      loadingContainerRef.current.classList.add('completed')
    }
    else {
      loadingContainerRef.current.classList.remove('completed')
      loadingContainerRef.current.classList.add('started')
    }

  }, [contentIsReady, mode])

  return (
    <div ref={loadingContainerRef} className={`loading-container`}>
      <div className='loading-box'>
        <div className={`circle`}></div>
        <div className={`circle`}></div>
        <div className={`circle`}></div>
      </div>
    </div>
  )
}

export default Loading
