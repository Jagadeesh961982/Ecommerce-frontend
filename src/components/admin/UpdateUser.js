import React, { useEffect, useState } from 'react'
import './newProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createNewProduct } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { Button } from '@mui/material'
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../../actions/userAction'
import { UPDATE_USER_RESET } from '../../constants/userContants'


const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id:userId}=useParams()
    const { loading, error,user} = useSelector(state => state.allUsers)
    const {error:updatedError,isUpdated}=useSelector(state=>state.user)
    const [role,setRole]=useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(userId,{isAdmin:role==='Admin'?true:false}))
    }
    
    useEffect(() => {
        if(user?.user?._id!==userId){
             dispatch(getUserDetails(userId))
        }
        if (error) {
            toast.error(error.extraDetails?error.extraDetails:error.message)
            dispatch(clearErrors())
        }
        if(updatedError){
          toast.error(updatedError.extraDetails?updatedError.extraDetails:updatedError.message)
        }
        if (isUpdated) {
            toast.success('User role updated successfully')
            dispatch({ type: UPDATE_USER_RESET })
            navigate('/admin/users')
        }
    }, [error,updatedError, dispatch, isUpdated, navigate])
    return (
        <>
            <MetaData title="Admin- Update User" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form className='newProductForm' onSubmit={submitHandler}>
                        <h1>Update User</h1>
                        <div>
                            <PermIdentityIcon />
                            <input type='text' placeholder='Name' value={user?.user?.name} readOnly/>
                        </div>
                        <div>
                            <MailOutlineIcon />
                            <input type='email' value={user?.user?.email} placeholder='Email' readOnly />
                        </div>
                        <div>
                            <VerifiedUserIcon />
                            <select value={user?.user?.isAdmin?'Admin':'User'} onChange={e => setRole(e.target.value)}>
                                <option value=''>Select Role</option>
                                <option value='Admin'>Admin</option>
                                <option value='User'>User</option>
                            </select>
                        </div>
                        <Button type='submit' disabled={loading ? true : false} className='createProductBtn'>Update</Button>

                    </form>
                
                </div>
            </div>
        </>
    )
}


export default UpdateUser