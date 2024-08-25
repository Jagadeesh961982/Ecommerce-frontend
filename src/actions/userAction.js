import axios from "axios";
import { ALL_FEEDBACKS_FAIL, ALL_FEEDBACKS_REQUEST, ALL_FEEDBACKS_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FEEDBACK_DELETE_FAIL, FEEDBACK_DELETE_REQUEST, FEEDBACK_DELETE_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SUBMIT_FEEDBACK_FAIL, SUBMIT_FEEDBACK_REQUEST, SUBMIT_FEEDBACK_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userContants";
import { GET_CART_ITEMS_SUCCESS } from "../constants/cartConstants";
import {toast } from 'react-toastify';
const baseUrl=process.env.REACT_APP_BASE_URL;


// Login
export const userLogin=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        const response=await axios.post(`${baseUrl}/api/login`,{email,password},{withCredentials:true})
        // console.log("1",response.data.user.cartItems)
        dispatch({type:USER_LOGIN_SUCCESS,payload:response.data})
        dispatch({type:GET_CART_ITEMS_SUCCESS,payload:response.data.user.cartItems})
        toast("Successfully Login") 

    }catch(error){
        // console.log(error)
        dispatch({type:USER_LOGIN_FAIL,payload:error.response.data.message})
    }
}

// Register
export const userRegister=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        // const config={Headers:{'Content-Type':'multipart/form-data'}}
        const response=await axios.post(`${baseUrl}/api/register`,userData,{withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        dispatch({type:USER_REGISTER_SUCCESS,payload:response.data})
    }catch(error){
        // console.log(error)
        dispatch({type:USER_REGISTER_FAIL,payload:error.response.data})
    }
}

// Load User
export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST})
        const response=await axios.get(`${baseUrl}/api/profile`,{withCredentials:true})
        // console.log("2",response.data)
        dispatch({type:LOAD_USER_SUCCESS,payload:response.data})

    }catch(error){
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data})
    }
}

// Logout
export const userLogout=()=>async(dispatch)=>{
    try{
        await axios.get(`${baseUrl}/api/logout`,{withCredentials:true})
        dispatch({type:USER_LOGOUT_SUCCESS})
    }catch(error){
        dispatch({type:USER_LOGOUT_FAIL,payload:error.response.data})
    }
}

// edit profile
export const updateProfile=(userData)=>async(dispatch)=>{
    // console.log(userData)
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST})
        const response=await axios.put(`${baseUrl}/api/profile/update`,userData,{withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:response.data.success})
    }catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data})
    }
} 

// update password
export const updatePassword=(passwords)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST})
        const response=await axios.put(`${baseUrl}/api/password/update`,passwords,{withCredentials:true,
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:response.data.success})
    }catch(error){
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data})
    }
}

// forgot password
export const forgotPassword=(email)=>async(dispatch)=>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST})
        const response=await axios.post(`${baseUrl}/api/password/reset`,{email},{withCredentials:true,
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:response.data.message})
    }catch(error){
        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data})
    }
}

// Reset password
export const resetPassword=(token,passwords)=>async(dispatch)=>{
    try{
        dispatch({type:RESET_PASSWORD_REQUEST})
        const response=await axios.put(`${baseUrl}/api/password/reset/${token}`,passwords,{withCredentials:false,
            headers:{
                'Content-Type':'application/json'
            }
        })
        // console.log(response.data)
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:response.data.success})
    }catch(error){
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data})
    }
}

export const submitFeedback=(feedbackData)=>async(dispatch)=>{
    try{
        dispatch({type:SUBMIT_FEEDBACK_REQUEST})
        // console.log("working")
        const response=await axios.put(`${baseUrl}/api/feedback`,feedbackData,{withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        dispatch({type:SUBMIT_FEEDBACK_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:SUBMIT_FEEDBACK_FAIL,payload:error.response.data.message})
    }
}

// Admin actions
export const getAllUseres=()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_USERS_REQUEST})
        const response=await axios.get(`${baseUrl}/api/admin/users`,{withCredentials:true})
        dispatch({type:ALL_USERS_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:ALL_USERS_FAIL,payload:error.response.data.message})
    }
}

export const getUserDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:USER_DETAILS_REQUEST})
        const response=await axios.get(`${baseUrl}/api/admin/user/${id}`,{withCredentials:true})
        dispatch({type:USER_DETAILS_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:USER_DETAILS_FAIL,payload:error.response.data.message})
    }
}

export const updateUser=(id,userData)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_USER_REQUEST})
        const config={headers:{'Content-Type':'application/json'},withCredentials:true}
        const response=await axios.put(`${baseUrl}/api/admin/user/${id}`,userData,config)
        dispatch({type:UPDATE_USER_SUCCESS,payload:response.data.success})
    }catch(error){
        dispatch({type:UPDATE_USER_FAIL,payload:error.response.data.message})
    }
}

export const deleteUser=(id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_USER_REQUEST})
        const response=await axios.delete(`${baseUrl}/api/admin/user/${id}`,{withCredentials:true})
        dispatch({type:DELETE_USER_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:DELETE_USER_FAIL,payload:error.response.data.message})
    }
}

export const getAllFeedbacks=()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_FEEDBACKS_REQUEST})
        const response=await axios.get(`${baseUrl}/api/admin/feedbacks`,{withCredentials:true})
        // console.log(response.data)
        dispatch({type:ALL_FEEDBACKS_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:ALL_FEEDBACKS_FAIL,payload:error.response.data.message})
    }
}

export const deleteFeedback=(id)=>async(dispatch)=>{
    try{
        dispatch({type:FEEDBACK_DELETE_REQUEST})
        const response=await axios.delete(`${baseUrl}/api/admin/feedback/${id}`,{withCredentials:true})
        dispatch({type:FEEDBACK_DELETE_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:FEEDBACK_DELETE_FAIL,payload:error.response.data.message})
    }
}
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}