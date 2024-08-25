import React, { useEffect, useState } from 'react'
import './resetPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../actions/userAction'
import Loading from '../layout/Loading/Loading'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'  
import MetaData from '../layout/MetaData'

const ResetPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const token=window.location.pathname.split('/')
    const {error,loading,success}=useSelector(state=>state.forgotPassword)
    console.log(error,loading,success)

    const resetPasswordHandler=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        myForm.set('password',password)
        myForm.set('confirmPassword',confirmPassword)
        dispatch(resetPassword(token[3],myForm))

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
        if(success){
            toast.success('Password reset successfully')
            navigate('/login')
        }
    },[dispatch,error,success])
  return (
    <>
        {loading? <Loading />:(
        <>
        <MetaData title='Reset Password' />
        <div className="resetPasswordContainer">
            <div className='resetPasswordBox'>
                <div className='resetPasswordHeading'>
                    <h2>Reset Password</h2>
                </div>
                <form className='resetPasswordForm' onSubmit={resetPasswordHandler}>
                    <div className='resetPasswordInput'>
                        <LockOpenIcon />
                        <input type='password' placeholder='New Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className='resetPasswordInput'>
                        <LockIcon />
                        <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <input type='submit' value='Reset Password' className='resetPasswordBtn'/>
                </form>
            </div>
        </div>
        </>
    )}
    </>
  )
}

export default ResetPassword