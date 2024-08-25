import React from 'react'
import './confirmOrder.css'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { Typography } from '@mui/material'


const ConfirmOrder = () => {
    const navigate=useNavigate()
    const {shippingInfo,cartItems}=useSelector(state=>state.allCartItems)
    const {user}=useSelector(state=>state.userLoginRegister)
    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country},${shippingInfo.pincode}`

    const subtotal=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const shippingPrice=subtotal>=1000?0:50
    const tax=Math.round(subtotal*18)/100
    
    const total=Math.round((subtotal+shippingPrice+tax)*100)/100

    const proceedToPayment=()=>{
        const data={
            subtotal,
            shippingPrice,
            tax,
            total
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/process/payment')
    }
  return (
    <>
        <MetaData title={'Confirm Order'} />
        <CheckoutSteps activeStep={1} />
        <div className='confirmOrderPage'>
            <div>
                <div className='confirmShippingArea'>
                    <Typography>Confirm ShippingInfo</Typography>
                    <div className='confirmShippingAreaBox'>
                        <div>
                            <p>name:</p>
                            <span>{user.user.name}</span>
                        </div>
                        <div>
                            <p>phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>address:</p>
                            <span>{address}</span>
                        </div>
                    </div>

                </div>
                <div className='confirmCartItems'>
                    <Typography>Your Cart Items:</Typography>
                    <div className='confirmCartItemsBox'>
                        {cartItems && cartItems.map(item=>(
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

            <div>
                <div className='orderSummary'>
                    <Typography>Order Summary</Typography>
                    <div className='orderSummaryBox'>
                        <div>
                            <p>SubTotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Delivery Charges:</p>
                            <span>₹{shippingPrice}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
                    <div className='orderSummaryTotal'> 
                        <p><b>Total:</b></p>
                        <span>₹{total}</span>

                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConfirmOrder