import React,{useEffect, useState} from 'react'
import './updatePassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePassword } from '../../actions/userAction'
import Loading from '../layout/Loading/Loading'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userContants'
import MetaData from '../layout/MetaData'

const UpdatePassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {error,isUpdated,loading}=useSelector(state=>state.profile)

    const [oldPassword,setOldPassword]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [show,setShow]=useState(false)

    const updatePasswordHandler=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        myForm.set('oldPassword',oldPassword)
        myForm.set('password',password)
        myForm.set('confirmPassword',confirmPassword)
        dispatch(updatePassword(myForm))
        
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
        if(isUpdated){
            toast.success('Password updated successfully')
            navigate('/account')
            dispatch({type:UPDATE_PASSWORD_RESET})
        }
    },[dispatch,error,isUpdated])
  return (
    <>
        {loading? <Loading />:(
        <>
        <MetaData title='Update Password' />
        <div className="updatePasswordContainer">
            <div className='updatePasswordBox'>
                <div className='updatePasswordHeading'>
                    <h2>Update Password</h2>
                </div>
                <form className='updatePasswordForm' onSubmit={updatePasswordHandler}>
                    <div className='updatePasswordInput'>
                        <VpnKeyIcon />
                        <input type='password' placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                    </div>
                    <div className='updatePasswordInput'>
                        <LockOpenIcon />
                        <input type='password' placeholder='New Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className='updatePasswordInput'>
                        <LockIcon />
                        <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <input type='submit' value='Update Password' className='updatePasswordBtn'/>
                </form>
            </div>
        </div>
        </>
    )}
    </>
  )
}

export default UpdatePassword