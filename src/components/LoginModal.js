import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../hooks/useModal';
import ForgotPassword from './ForgotPassword';
import Signin from './Signin';
import Signup from './Signup';
import SigninInformation from './SignupInformation';

const LoginModal = () => {
  const [islogin, setisLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [signinInfo, setSigninInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const { openModal, setOpenModal } = useModal();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser)
      setOpenModal(false)
  }, [currentUser, setOpenModal])

  return (
    <div className="modal">
      <i onClick={() => setOpenModal(!openModal)} className="fas fa-times"></i>
      {!signinInfo ?
        (!forgotPassword ?
          (<>
            {islogin && <Signin setisLogin={setisLogin} islogin={islogin} setForgotPassword={setForgotPassword} />}
            {!islogin && <Signup setisLogin={setisLogin} islogin={islogin}
              setSigninInfo={setSigninInfo} signinInfo={signinInfo} userInfo={userInfo} setUserInfo={setUserInfo} />}
          </>)
          : <ForgotPassword setForgotPassword={setForgotPassword} />
        )
        :
        <SigninInformation userInfo={userInfo} setUserInfo={setUserInfo} />
      }
    </div >
  )
}

export default LoginModal
