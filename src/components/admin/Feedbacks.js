import React, { useEffect } from 'react';
import './feedbacks.css';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData.js';
import Loading from '../layout/Loading/Loading.js';
import Sidebar from './Sidebar.js';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { clearErrors, deleteFeedback, getAllFeedbacks } from '../../actions/userAction.js';
import { FEEDBACK_DELETE_RESET } from '../../constants/userContants.js';

const Feedbacks = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const {feedbacks,loading,error,isDeleted}=useSelector(state=>state.userFeedback)


  const columns = [
    {field :"id",headerName:"Feedback Id",minWidth:250,flex:0.9},
    {field:"user_id",headerName:"User Id",minWidth:250,flex:0.9},
    {field :"name",headerName:"Name",minWidth:150,flex:0.5},
    {field :"email",headerName:"Email",minWidth:250,flex:0.7},
    {field :"message",headerName:"Message",minWidth:550,flex:1},
    {field :"createdAt",headerName:"Created At",minWidth:200,flex:0.4},
    {field : "actions",headerName:"Actions",minWidth:100,flex:0.2,sortable:false,
      renderCell:(params)=>{
        return(
          <>
            <Button onClick={()=>handleDeleteFeed(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        )
      }},]
  const rows = []
  feedbacks && feedbacks.forEach(feedback=>{
    rows.push({
        id:feedback.id,
        user_id:feedback.userId,
        name:feedback.name,
        email:feedback.email,
        message:feedback.feedback,
        createdAt:new Date(feedback.createdAt),
    })
  })
  console.log(rows)


  const handleDeleteFeed=(id)=>{
    dispatch(deleteFeedback(id))
  }
  

  useEffect(()=>{
    if(error){
      toast.error(error.extraDetails||error.message)
      dispatch(clearErrors())
    }
    if(isDeleted?.success){
        toast.success(isDeleted?.message)
        dispatch({type:FEEDBACK_DELETE_RESET})

    }
      dispatch(getAllFeedbacks())
  },[error,dispatch,isDeleted])
  return (
    <>
      <MetaData title="Admin- All Feedbacks" />
      {
        loading ? <Loading />:(
          <>
            <div className='dashboard'>
              <Sidebar />
              <div className='feedbackContainer'>
                <h1 id='feedbackHeading'>ALL FEEDBACKS</h1>

                <DataGrid 
                  columns={columns}
                  rows={rows}
                  pageSize={10}
                  disableSelectionOnClick
                  className='feedbackTable'
                  autoHeight
                />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Feedbacks