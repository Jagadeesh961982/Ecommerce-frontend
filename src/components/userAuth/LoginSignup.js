import './loginSignup.css'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import profile from "../../images/Profile.png"
import { clearErrors, userLogin, userRegister } from '../../actions/userAction';
import { useDispatch,useSelector } from 'react-redux';
import {toast } from 'react-toastify';
import Loading from '../layout/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const baseUrl=process.env.REACT_APP_BASE_URL;
const LoginSignup= () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const [loginEmail,setLoginEmail] =useState('')
  const [loginPassword,setLoginPassword]=useState('')
  const [user,setUser]=useState({
    "name":"",
    'email':"",
    'password':""
  })
  const [avatarPreview,setAvatarPreview]=useState(profile)
  const [avatar,setAvatar]=useState(profile)
  const redirect=window.location.search?`/${window.location.search.split('=')[1]}`:"/account"

  const {name,email,password}=user

  const loginTab=useRef(null)
  const registerTab=useRef(null)
  const switcherTab=useRef(null)

  const registerDataChange=(e)=>{
   if(e.target.name==="avatar"){
        const reader=new FileReader()
        reader.onload=()=>{
          if(reader.readyState===2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
          }
      }
      reader.readAsDataURL(e.target.files[0])
   }else{
    setUser({...user,[e.target.name]:e.target.value})
   }
  }
  const {isAuthenticated,loading,error}=useSelector(state=>state.userLoginRegister)
  // console.log(isAuthenticated,loading)
  
  const loginHandler=(e)=>{
    e.preventDefault()
    dispatch(userLogin(loginEmail,loginPassword))
    
  }

  const signUpHandler=(e)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.set("name",name)
    myForm.set('email',email)
    myForm.set('password',password)
    myForm.set('avatar',avatar)
    dispatch(userRegister(myForm))
  }

  useEffect(()=>{
    // console.log("err",error)
    if(error){
      if(error.extraDetails!==""){
        toast.error(error.extraDetails)
      }else{
        // console.log(error)
        toast.error(error.message)
      }
      
      dispatch(clearErrors())
    }
    if(isAuthenticated){
      navigate(redirect)
    }
  },[dispatch,error,isAuthenticated])

  const switchTabs=(e,tab)=>{
    if(tab==='login'){
      switcherTab.current.classList.remove("shiftToRight")
      switcherTab.current.classList.add("shiftToNeutral")

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if(tab==='register'){
      switcherTab.current.classList.add('shiftToRight')
      switcherTab.current.classList.remove('shiftToNeutral')
      
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");

    }
  }
  return (
    <>
      {loading?<Loading />:(
      <>
          <div className='loginSignupContainer'>
            <div className='loginSignupBox'>
              <div>
                  <div className='login_signup_toggle'>
                    <p onClick={e=>switchTabs(e,"login")}>Login</p>
                    <p onClick={e=>switchTabs(e,"register")}>Register</p>
                  </div>
                  <button ref={switcherTab}></button>
              </div>
              <form className='loginForm' ref={loginTab} onSubmit={loginHandler}>
                  <div className='loginEmail'>
                    <MailOutlineIcon />
                    <input type='email' placeholder='Email' value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required />
                  </div>
                  <div className='loginPassword'>
                    <LockOpenIcon />
                    <input type='password' placeholder='password' value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} required />
                  </div>
                  <a><Link to='/password/forgot'>Forgot Password ?</Link></a>
                  <input type='submit' value='Login' className='loginBtn' />
              </form>
              <form className='signupForm' ref={registerTab} onSubmit={signUpHandler} encType='multipart/form-data'>
                  <div className='signupUser'>
                    <PermIdentityIcon />
                    <input type='text' name='name' placeholder='UserName' value={name} onChange={registerDataChange} required />
                  </div>
                  <div className='signupEmail'>
                    <MailOutlineIcon />
                    <input type='email' name='email' placeholder='Email' value={email} onChange={registerDataChange} required />
                  </div>
                  <div className='signupPassword'>
                    <LockOpenIcon />
                    <input type='password' name='password' placeholder='password' value={password} onChange={registerDataChange} required />
                  </div>
                  <div id='registerImage'>
                    <img src={avatarPreview} alt='Avatar Preview' />
                    <input type='file' name='avatar' accept='image/*' onChange={registerDataChange} />
                  </div>
                  <input type='submit' value='SignUp' className='signupBtn' />
              </form>
            </div>
          </div>
      </>
    )}
    </>
  )
}

export default LoginSignup