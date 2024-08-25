import React, { useEffect } from 'react';
import './productList.css';
import { useDispatch,useSelector } from 'react-redux';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants.js';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction.js';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData.js';
import Loading from '../layout/Loading/Loading.js';
import Sidebar from './Sidebar.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUseres } from '../../actions/userAction.js';
import { DELETE_USER_RESET } from '../../constants/userContants.js';

const UsersList = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {users,loading,error}=useSelector(state=>state.allUsers)
  const {error:deleteError,isDeleted,message}=useSelector(state=>state.user)

  const columns = [
    {field :"id",headerName:"User Id",minWidth:200,flex:0.9},
    {field :"name",headerName:"Name",minWidth:350,flex:1},
    {field :"email",headerName:"Email",minWidth:150,flex:1},
    {field :"role",headerName:"Role",minWidth:270,flex:0.3,cellClassName:(params)=>{return params.value==="Admin"?"greenColor":"redColor"}},
    {field : "actions",headerName:"Actions",minWidth:150,flex:0.3,sortable:false,
      renderCell:(params)=>{
        return(
          <>
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=>handleDeleteUser(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        )
      }},]
  const rows = []
  
  users && users.map((user)=>(
    rows.push({
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.isAdmin?"Admin":"User"
    })
  ))

  const handleDeleteUser=(id)=>{
    dispatch(deleteUser(id))
  }
  

  useEffect(()=>{
    if(error){
      toast.error(error.extraDetails||error.message)
      dispatch(clearErrors())
    }
    if(deleteError){
      toast.error(deleteError.extraDetails||deleteError.message)
      dispatch(clearErrors())
    }
    if(isDeleted){
      toast.success(message)
      dispatch({type:DELETE_USER_RESET})
      navigate('/admin/users')
    }
      dispatch(getAllUseres())
  },[error,dispatch,deleteError,isDeleted,message])
  return (
    <>
      <MetaData title="Admin- All Users" />
      {
        loading ? <Loading />:(
          <>
            <div className='dashboard'>
              <Sidebar />
              <div className='productListContainer'>
                <h1 id='productListHeading'>ALL USERS</h1>

                <DataGrid 
                  columns={columns}
                  rows={rows}
                  pageSize={10}
                  disableSelectionOnClick
                  className='productListTable'
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


export default UsersList