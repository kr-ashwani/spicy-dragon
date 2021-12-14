import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useDoc } from '../hooks/useDoc';
import { useLoading } from '../hooks/useLoading';
import useMounted from '../hooks/useMounted';
import { useTheme } from '../hooks/useTheme';
import AnimatedInput from './AnimatedInput';
import './css/UserDashboard.css'
import DummyContent from './DummyContent';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { setContentIsReady } = useLoading();
  const { logOut, currentUser } = useAuth();
  const { document: user } = useDoc('users', currentUser.uid)
  const { navColor, mode } = useTheme()
  const [remountCount, setRemountCount] = useState(0)
  const mountedStatus = useMounted();

  useEffect(() => {
    setTimeout(() => {
      if (mountedStatus.current)
        setRemountCount(1);
    }, 2000)
  }, [setRemountCount, mountedStatus])

  useEffect(() => {
    if (remountCount === 1 && !user)
      setContentIsReady(false)
    else if (user)
      setContentIsReady(true)

  }, [user, setContentIsReady, remountCount])

  async function userLogout() {
    try {
      await logOut();
      navigate('/')
    }
    catch (err) {
      console.log(err.message);
    }
  }

  return (
    user ?
      (<div className="dashboard">
        <Avatar style={{ width: "250px", height: "250px" }} src={user ? user.photoURL : ""} />
        <div className="userInformation">
          <div className={`userDetail ${mode}`}>
            <p className="infoTitle">Name</p>
            <AnimatedInput value="userName" user={user} type="text" />

            <p className="infoTitle">Email address</p>
            <p>{user.email}</p>

            <p className="infoTitle">Phone Number</p>
            <AnimatedInput value="phoneNumber" user={user} type="number" />

            <p className="infoTitle">Last Signed in</p>
            <p>{user.lastSignInTime.toDate().toDateString()}</p>

            <p className="infoTitle">Account created on</p>
            <p>{user.creationTime.toDate().toDateString()}</p>

            <p className="infoTitle">Recipe added</p>
            <p>{user.recipeAdded ? user.recipeAdded.length : 0}</p>

          </div>
          <button style={{ backgroundColor: `${navColor}` }} onClick={userLogout}>Logout</button>
        </div>
      </div >) :
      <DummyContent />
  )
}

export default UserDashboard
