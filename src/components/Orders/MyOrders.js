import React, { useEffect } from 'react'
import './myOrders.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData.js'
import { DataGrid } from '@mui/x-data-grid';
import Loading from '../layout/Loading/Loading.js'
import LaunchIcon from '@mui/icons-material/Launch';
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, getMyorders } from '../../actions/orderAction.js'
import { toast } from 'react-toastify'

const MyOrders = () => {
  const dispatch = useDispatch()
  const {user}=useSelector(state=>state.userLoginRegister)
  const {orders, loading,error} = useSelector(state => state.myOrders)


  const columns=[
        { field:"id", headerName:"Order Id",minWidth:300,flex:1},
        { field:"status", headerName:"Status",minWidth:150,flex:1,cellClassName:(params)=>{return params.value === "Delivered"?"greenColor":""}},
        { field:"itemsQnty", headerName:"Items Quantity",type:"number",minWidth:150,flex:1},
        { field:"amount", headerName:"Amount",type:"number",minWidth:270,flex:1},
        { field:"actions", headerName:"Actions",type:"number",minWidth:150,flex:1,sortable:false,
          renderCell:(params)=>{
            return (
              <Link to={`/orders/${params.id}`}>
                <LaunchIcon />
              </Link>
            )
          }
        }
        
  ]
  const rows=[]

  orders && orders.map((item)=>(
    rows.push({
      id:item._id,
      itemsQnty:item.orderItems.length,
      status:item.orderStatus,
      amount:item.totalPrice
    })
  ))

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
    dispatch(getMyorders())
  },[dispatch,error])
  return (
    <>
      <MetaData title={'My Orders'} />
      {loading ? <Loading /> : (
        orders?.length===0 ? <div className='noOrders'>
          <Typography id="noOrdersHeading">No orders yet</Typography>
          <Link to='/'>Go back to home</Link>
        </div> :
        <div className='myOrdersPage'>
          <h1 className='ordersHeading'>MY ORDERS</h1>
          <div className='myOrdersTable'>
            {orders && orders.map((order)=>(
              order?.orderItems?.map((item)=>(
                <Link to={`/orders/${order._id}`} key={item.product} className='order'>
                  <img src={item.image} alt={item.name} />
                  <p>{item.quantity*item.price}</p>
                  <p>Delivery Status <br/> <b>{order.orderStatus}</b></p>
                </Link>
              ))
            ))

            }</div>
          <Typography id="myordersHeading">{user?.user?.name}'s orders</Typography>
        </div>
      )}

    </>
  )
}

export default MyOrders


{/* <DataGrid 
  rows={rows}
  columns={columns}
  pageSizeOptions={[10, 100, { value: 1000, label: '1,000' }]}
  disableSelectionOnClick 
  className='myOrdersTable'
  autoHeight
  
  // checkboxSelection
  
/> */}