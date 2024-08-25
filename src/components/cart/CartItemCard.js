import React, { useEffect,useState } from 'react'
import './cartItemCard.css'
import { Link } from 'react-router-dom'
import { addItemToCart, getCartItems, removeItemFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/userAction';
import { ADD_TO_CART_RESET, REMOVE_CART_ITEM_RESET } from '../../constants/cartConstants';

const CartItemCard = ({item}) => {
  const dispatch=useDispatch();
  const {isDeleted,loading,error,message}=useSelector(state=>state.cartItem)
  console.log(isDeleted,loading,error,message)
  const {cartItems}=useSelector(state=>state.allCartItems)
  const [quantity,setQuantity]=useState(item.quantity);

  const increaseQuantity=()=>{
    if(item.stock>quantity && quantity<5){
        setQuantity((quantity)=>quantity+1);
        const cartItem={
          ...item,
          quantity:quantity+1
        }

        dispatch(addItemToCart(cartItem));
    }
    else{
      toast.success(`we are sorry!,only ${quantity} item(s) allowed in each order`)
    }
  }
  const decreaseQuantity=()=>{
    if(quantity>1){
      setQuantity((quantity)=>quantity-1);
      const cartItem={
        ...item,
        quantity:quantity-1
      }
      // console.log(cartItem)
      dispatch(addItemToCart(cartItem));
    } 
  }

  const removeItem=()=>{
    dispatch(removeItemFromCart(item.product,item.name));

  }

  useEffect(()=>{
    if(error){
      toast.error(error.extraDetails?error.extraDetails:error.message);
      dispatch(clearErrors());
    }
    if(isDeleted){
      dispatch({type:REMOVE_CART_ITEM_RESET})
      dispatch(getCartItems())
    }
    
    // console.log(isAdded,isDeleted,quantity,error)
    
    // if(isAdded){
    //   dispatch(getCartItems())
    //   toast.success(`Quantity of ${item.name} updated to ${quantity}`);
    //   // dispatch(getCartItems())
    //   dispatch({type:ADD_TO_CART_RESET})

    // }
    // if(message){
    //   dispatch(getCartItems())
    //   console.log(message)
    //   dispatch({type:ADD_TO_CART_RESET})
    // }
    

  },[isDeleted,error,message])
  return (
    <>
        <div className='cartItemCardContainer'>
          <div className='cartItemDetails'>
            <img src={item.image} alt={item.name} />
            <div >
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`price: ₹${item.price}`}</span>
                <a onClick={removeItem}>Remove</a>
            </div>
          </div> 
          <div className='cartItemInput'>
                <button onClick={decreaseQuantity}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={increaseQuantity}>+</button>
          </div>
          <div className='cartItemTotal'>
            <span>{`₹${item.price*quantity}`}</span>
          </div>
        </div>
    </>
  )
}

export default CartItemCard