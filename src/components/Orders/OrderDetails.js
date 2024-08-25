import React, { useEffect } from 'react'
import './orderDetails.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { clearErrors, getOrderDetails } from '../../actions/orderAction'
import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../constants/orderConstants'
import Loading from '../layout/Loading/Loading'
import { Typography } from '@mui/material'
import MetaData from '../layout/MetaData'

const OrderDetails = () => {
    const dispatch=useDispatch()
    const {id}=useParams()
    const {loading,error,orderDetails}=useSelector(state=>state.myOrders)


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
        dispatch(getOrderDetails(id))
    },[dispatch,id,error])
  return (
    <>
        {loading?   <Loading/>  :(
            <>
                <MetaData title='Order Details' />
                <div className='orderDetailsPage' >
                    <div className='orderDetailsContainer'>
                        <Typography component="h1">Order #{orderDetails && orderDetails._id}</Typography>
                        <Typography>Shipping Info</Typography>
                        <div className='orderDetailsContainerBox'>
                            <div>
                                <p>Name:</p>
                                <span>{orderDetails?.user.name}</span>
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
                    <div className='orderDetailsCartItems'>
                        <Typography>Order Items:</Typography>
                        <div className='orderDetailsCartItemsContainer'>
                            {orderDetails?.orderItems.map((item)=>(
                                <div key={item.product}>
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X ₹{item.price}=<b>₹{item.price*item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>

        )}
    </>
  )
}

export default OrderDetails