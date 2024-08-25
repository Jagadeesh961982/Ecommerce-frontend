import React, { useEffect } from 'react';
import './productList.css';
import { useDispatch,useSelector } from 'react-redux';
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
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction.js';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants.js';

const OrderList = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {orders,loading,error}=useSelector(state=>state.allOrders)
  const {error:deleteError,isDeleted}=useSelector(state=>state.adminOrder)

  const columns = [
        { field:"id", headerName:"Order Id",minWidth:300,flex:1},
        { field:"status", headerName:"Status",minWidth:150,flex:1,cellClassName:(params)=>{return params.value === "Delivered"?"greenColor":""}},
        { field:"itemsQnty", headerName:"Items Quantity",type:"number",minWidth:150,flex:1},
        { field:"amount", headerName:"Amount",type:"number",minWidth:270,flex:1},
        { field:"actions", headerName:"Actions",type:"number",minWidth:150,flex:1,sortable:false,
            renderCell:(params)=>{
              return (
                <>
                    <Link to={`/admin/order/${params.id}`}>
                    <EditIcon />
                    </Link>
                    <Button onClick={()=>handleDeleteOrder(params.id)}>
                    <DeleteIcon />
                    </Button>
                </>
              )
            }
          }
    ]
  const rows = []
  
  orders && orders.map((order)=>(
    rows.push({
      id:order._id,
      status:order.orderStatus,
      itemsQnty:order.orderItems.length,
      amount:order.totalPrice,
    })
  ))

   const handleDeleteOrder=(id)=>{
        dispatch(deleteOrder(id))
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
    if(isDeleted?.success){
      toast.success("Order deleted successfully")
      dispatch({type:DELETE_ORDER_RESET})
      navigate('/admin/orders')
    }
      dispatch(getAllOrders())
  },[error,dispatch,deleteError,isDeleted])
  return (
    <>
      <MetaData title="Admin- All Orders" />
      {
        loading ? <Loading />:(
          <>
            <div className='dashboard'>
              <Sidebar />
              <div className='productListContainer'>
                <h1 id='productListHeading'>ALL ORDERS</h1>

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

export default OrderList