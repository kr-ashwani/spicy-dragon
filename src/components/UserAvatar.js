import { Avatar } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router';
import { useDoc } from '../hooks/useDoc'

const UserAvatar = () => {
  const { document: user } = useDoc('users')
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/user')} className="userAvatar">
      <Avatar style={{ width: "47px", height: "47px" }} src={user ? user.photoURL : ""} />
    </div>
  )
}

export default UserAvatar
