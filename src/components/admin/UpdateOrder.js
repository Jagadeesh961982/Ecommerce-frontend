import './updateOrder.css'
import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import {useSelector,useDispatch} from 'react-redux'
import {Link, useNavigate,useParams} from 'react-router-dom'
import { Typography } from '@mui/material'
import Sidebar from './Sidebar'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction'
import { toast } from 'react-toastify'
import Loading from '../layout/Loading/Loading'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Button } from '@mui/material'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

const UpdateOrder = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
    const {error,loading,orderDetails}=useSelector(state=>state.myOrders)
    const {error:updateError,isUpdated}=useSelector(state=>state.adminOrder)
    const [status,setStatus]=useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateOrder(id,{orderStatus:status}))
    }

    useEffect(()=>{
        if(error){
            toast.error(error.extraDetails?error.extraDetails:error.message)
            dispatch(clearErrors())
        }
        if(updateError){
            toast.error(updateError.extraDetails?updateError.extraDetails:updateError.message)
            dispatch(clearErrors())
        }
        if(isUpdated){
            toast.success('Order Status Updated Successfully')
            dispatch({type:UPDATE_ORDER_RESET})
            navigate('/admin/orders')
        }
        dispatch(getOrderDetails(id))
    },[dispatch,id,error,isUpdated,updateError])
  return (
    <>
            <MetaData title="Admin- Update Order" />
            <div className='dashboard'>
                <Sidebar />
                <div className='updateProductContainer'>
                {loading?<Loading/>:
                (<div className='confirmOrderPage' style={{display:orderDetails?.orderStatus==='Delivered'?'block':'grid'}}>
                    <div>
                        <div className='confirmShippingArea'>
                            <Typography>Shipping Info</Typography>
                            <div className='orderDetailsContainerBox'>
                            <div>
                                <p>Name:</p>
                                <span>{orderDetails?.user?.name}</span>
                            </div>
                            <div>
                                <p>Phone</p>
                                <span>{orderDetails?.shippingInfo?.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address</p>
                                <span>{`${orderDetails?.shippingInfo?.address},${orderDetails?.shippingInfo?.city},${orderDetails?.shippingInfo?.state},${orderDetails?.shippingInfo?.pincode},${orderDetails?.shippingInfo?.country}`}</span>
                            </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className='orderDetailsContainerBox'>
                                <div>
                                    <p className={orderDetails?.paymentInfo?.status==="succeeded"?"greenColor":"redColor"}>{orderDetails?.paymentInfo?.status==="succeeded"?"Paid":"Not Paid"}</p>
                                </div>
                                <div>
                                    <p>Amount</p>
                                    <span>{orderDetails?.totalPrice}</span>
                                </div>
                            </div>
                            <Typography>Order Status</Typography>
                            <div className='orderDetailsContainerBox'>
                                <div>
                                    <p className={orderDetails?.orderStatus==="Delivered"?"greenColor":""}>{orderDetails?.orderStatus}</p>
                                </div>
                                
                            </div>

                        </div>
                        <div className='confirmCartItems'>
                            <Typography>Ordered Items:</Typography>
                            <div className='confirmCartItemsBox'>
                                {orderDetails?.orderItems && orderDetails?.orderItems.map(item=>(
                                    <div key={item.product}>
                                        <img src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>{item.quantity} x ₹{item.price} = <b>₹{item.quantity*item.price}</b></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    

                    {/*  */}

                    <div style={{display:orderDetails?.orderStatus==='Delivered'?'none':'block'}}>
                        <form className='updateOrderForm' onSubmit={submitHandler}>
                            <h1>Update Order Status</h1>
                            <div>
                                <AccountTreeIcon />
                                <select value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value=''>Select Order Status</option>
                                    {orderDetails?.orderStatus==='Processing' &&
                                    <option value='Shipped'>Shipped</option>}
                                    {orderDetails?.orderStatus==='Shipped' &&
                                    <option value='Delivered'>Delivered</option>}
                                </select>
                            </div>
                            <Button type='submit' disabled={loading ? true : false || status===""?true:false} id='updateOrderStatusBtn'>Update Order Status</Button>

                        </form>
                    </div>
                </div>)}
                        
                </div>
            </div>
        </>
        

  )
}

export default UpdateOrder