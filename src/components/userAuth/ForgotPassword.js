import React, { useEffect, useState } from 'react'
import './forgotPassword.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import Loading from '../layout/Loading/Loading';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading,error,message}=useSelector(state=>state.forgotPassword)
    const [email,setEmail]=useState('')
    const forgotPasswordHandler=(e)=>{
        e.preventDefault()
        dispatch(forgotPassword(email))
    }
    useEffect(()=>{
        if(error){
            if(error.extraDetails!==""){
                toast.error(error.extraDetails)
            }else{
                // console.log(error)
                toast.error(error.message)
            }
            dispatch(clearErrors())
        }
        if(message){
            toast.success(message)
            navigate('/login')
        }


    },[dispatch,error,message])
  return (
    <>
    {loading?<Loading/>:(
      <>
      <MetaData title='Forgot Password' />
      <div className='forgotPasswordContainer'>
          <div className='forgotPasswordBox'>

            <div className='forgotPasswordHeading'>
                <h2>ForgotPassword</h2>
            </div>
            <form className='forgotPasswordForm' onSubmit={forgotPasswordHandler} encType='multipart/form-data'>
                  <div className='forgotPasswordEmail'>
                    <MailOutlineIcon />
                    <input type='email' name='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required />
                  </div>
                  <input type='submit' value='Send Link' className='forgotPasswordBtn' />
              </form>
          </div>
        </div>
        </>

    )}
    
    </>
  )
}

export default ForgotPassword