import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import './css/LoginModal.css'
import ForgotPassword from './ForgotPassword';
import Signin from './Signin';
import SigninInformation from './SignupInformation';
import Signup from './Signup';

const LoginModal = ({ openModal, setOpenModal }) => {
  const [islogin, setisLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [signinInfo, setSigninInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  let container = useRef();
  const { currentUser } = useAuth();

  useEffect(() => {

    const unSub = function (e) {
      if (e.target === container.current)
        setOpenModal(!openModal)
    }
    document.body.addEventListener('click', unSub);
    return () => {
      document.body.removeEventListener('click', unSub);
    }
  }, [openModal, setOpenModal, currentUser]);

  return (
    <div ref={container} className="modalContainer">
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
    </div >
  )
}

export default LoginModal
