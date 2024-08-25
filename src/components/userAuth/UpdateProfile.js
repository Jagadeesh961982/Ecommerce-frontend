import React,{useState,useEffect} from 'react'
import './updateProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import Loading from '../layout/Loading/Loading'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import profile from "../../images/Profile.png"
import { UPDATE_PROFILE_RESET } from '../../constants/userContants'
import MetaData from '../layout/MetaData'



const UpdateProfile = () => {
  
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {user}=useSelector(state=>state.userLoginRegister)
    // console.log(user,user?.user?.avatar)
    const {error,isUpdated,loading}=useSelector(state=>state.profile)
    // console.log(error,isUpdated,loading)

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarPreview,setAvatarPreview]=useState(profile)

    const profileDataChange=(e)=>{
       
      const reader=new FileReader()
      reader.onload=()=>{
        if(reader.readyState===2){
          // console.log(reader.result)
            setAvatarPreview(reader.result)
            setAvatar(reader.result)

        }
      }
      console.log(e.target)
      reader.readAsDataURL(e.target.files[0])
          
    }

    const updateProfileHandler=(e)=>{
      e.preventDefault()
      const myForm=new FormData()
      myForm.set("name",name)
      myForm.set('email',email)
      myForm.set('avatar',avatar)
      dispatch(updateProfile(myForm))
    }

    useEffect(()=>{
        // console.log("err",error)
        if(user){
          setName(user?.user?.name)
          setEmail(user?.user?.email)
          setAvatarPreview(user?.user?.avatar?.url)
        }
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
            toast.success("Profile Updated Successfully")
            dispatch(loadUser())
            navigate("/account")
            dispatch({type:UPDATE_PROFILE_RESET})
        }
          
          
    
    },[dispatch,error,user,isUpdated])
  return (
    <>
    {loading?<Loading/>:(
      <>
      <MetaData title='Update Profile' />
      <div className='updateProfileContainer'>
          <div className='profileBox'>

            <div className='profileUpdateHeading'>
                <h2>Update Profile</h2>
            </div>
            <form className='profileForm' onSubmit={updateProfileHandler} encType='multipart/form-data'>
                  <div className='profileUser'>
                    <PermIdentityIcon />
                    <input type='text' name='name' placeholder='UserName' value={name} onChange={e=>setName(e.target.value)} required />
                  </div>
                  <div className='profileEmail'>
                    <MailOutlineIcon />
                    <input type='email' name='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required />
                  </div>
                  <div id='profileImage'>
                    <img src={avatarPreview} alt='Avatar Preview' />
                    <input type='file' name='avatar' accept='image/*' onChange={profileDataChange} />
                  </div>
                  <input type='submit' value='Update' className='updateProfileBtn' />
              </form>
          </div>
        </div>
        </>

    )}
    
    </>
  )
}

export default UpdateProfile