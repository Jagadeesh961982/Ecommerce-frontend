import React, { useEffect, useState } from 'react'
import './contact.css'
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, submitFeedback } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SUBMIT_FEEDBACK_RESET } from '../../constants/userContants';

const Contact = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.userLoginRegister)
    const {isSubmitted,loading,error}=useSelector(state=>state.userFeedback)
    const name=user?.user?.name
    const email=user?.user?.email
    const [message,setMessage]=useState('')
    const feedBackSubmitHandler=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        myForm.append('id',user?.user?._id)
        myForm.append('message',message)
        dispatch(submitFeedback(myForm))
    }
    useEffect(()=>{
        if(error){
            toast.error(error.extraDetails||error.message)
            dispatch(clearErrors())
          }
        if(isSubmitted?.success){
            toast.success(isSubmitted.message)
            dispatch({type:SUBMIT_FEEDBACK_RESET})
            navigate('/')

        }
    },[dispatch,error,isSubmitted])

  return (
    <>
        <div className='contactContainer'>
            <div className='contactBox'>
                <FeedbackIcon/>
                <h2>Contact Us</h2>
                <span>Send us your feedback</span>
                <form className='contactForm' onSubmit={feedBackSubmitHandler}>
                    <div className='formGroup'>
                        <label>Name</label>
                        <input type='text' value={name} disabled/>
                    </div>
                    <div className='formGroup'>
                        <label>Email</label>
                        <input type='email' value={email} disabled />
                    </div>
                    <div className='formGroup'>
                        <label>Message</label>
                        <textarea placeholder='Enter your feedback' rows={10} onChange={(e)=>setMessage(e.target.value)}></textarea>
                    </div>
                    <input type='submit' value='Send' className='contactBtn' />
                    <span>Thanks For Your Feedback, We Will Resolve asap</span>
                    <span><a>You may contact us on 1234-567-899</a></span>

                </form>
            </div>
        </div>

    </>
  )
}

export default Contact