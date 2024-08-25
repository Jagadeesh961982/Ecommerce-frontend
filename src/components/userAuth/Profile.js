import React, { useEffect } from 'react'
import "./profile.css"
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate=useNavigate()
    const {isAuthenticated,loading,user}=useSelector(state=>state.userLoginRegister)
    // console.log(user,isAuthenticated)
    
   useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login")
        }
        // window.location.reload()
   },[isAuthenticated])
  return (
    <>
        <MetaData title={`${user?.user?.name}'s profile`} />
        <div className='profileContainer'>
            <div>
                <h1>My Profile</h1>
                <img src={user?.user?.avatar.url} alt={user?.user?.name} />
                <Link to='/profile/update'>Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user?.user?.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user?.user?.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user?.user?.createdAt).substring(0, 10)}</p>
                </div>
                <div>
                    <Link to='/orders'>My Orders</Link>
                    <Link to='/password/update'>Change Password</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile