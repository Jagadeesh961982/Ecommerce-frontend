import React, { useEffect } from 'react'
import './cart.css'
import CartItemCard from './CartItemCard.js'
import {useDispatch, useSelector} from "react-redux"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/userAction.js';
import { getCartItems } from '../../actions/cartActions.js';

const Cart = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {cartItems,loading,error}=useSelector(state=>state.allCartItems)
    // console.log(user?.user?.cartItems)

    const checkoutHandler=()=>{
        navigate('/login?redirect=shipping')
    }
    useEffect(()=>{
        if(error){
            toast.error(error.extraDetails?error.extraDetails:error.message)
            dispatch(clearErrors())
        }
    },[error])
  return (
    <>
        <div className='cartContainerHome'>

        {cartItems.length===0?(
            <div className='cartEmpty'>
                <RemoveShoppingCartIcon />
                <Typography>Your Cart is Empty</Typography>
                <Link to='/products'>View Products</Link>

            </div>):
            (<div className='cartContainer'>
                <div className='cartHeader'>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                <div className='cartCardContainer'>
                    {(
                            cartItems.map(item=>(
                                <CartItemCard item={item} key={item.product} />
                            ))
                        )}
                    
                </div>
                <div className='cartGrossTotal'>
                    <div>
                    </div>
                    <div className='cartGrossTotalBox'>
                        <p>Sub Total</p>
                        <p>₹{cartItems.reduce((acc,item)=>acc+(item.quantity*item.price),0)}</p>
                    </div>
                    <div className='checkoutBtn'>
                        <button onClick={checkoutHandler}>Place Order</button>
                    </div>
                </div>

            </div>)}
        </div>
    </>
  )
}

export default Cart