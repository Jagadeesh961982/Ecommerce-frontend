import axios from "axios";
import { ADD_TO_CART, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_RESET, ADD_TO_CART_SUCCESS, GET_CART_ITEMS_FAIL, GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS, REMOVE_ALL_CART_ITEMS_FAIL, REMOVE_ALL_CART_ITEMS_REQUEST, REMOVE_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAIL, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import { toast } from "react-toastify";


const BASE_URL = "http://localhost:5000";
// export const addItemToCart=(id,quantity)=>async(dispatch,getState)=>{
//     const {data}=await axios.get(`${BASE_URL}/api/product/${id}`);
//     dispatch({type:ADD_TO_CART,payload:{
//         product:data.product._id,
//         name:data.product.name,
//         price:data.product.price,
//         image:data.product.images[0].url,
//         stock:data.product.stock,
//         quantity
//     }})
//     localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
// }

export const addItemToCart=(cartItem)=>async(dispatch)=>{
    try{
        dispatch({type:ADD_TO_CART_REQUEST})

        const config={headers:{"Content-Type":"application/json"},withCredentials:true}

        const response=await axios.put(`${BASE_URL}/api/cart/add`,cartItem,config)
        dispatch({type:ADD_TO_CART_SUCCESS,payload:response.data})
        toast.success(response.data.message)
        console.log("1")
        dispatch(getCartItems())
        console.log("2")
        dispatch({type:ADD_TO_CART_RESET})
        console.log("3")
    }catch(error){
        dispatch({type:ADD_TO_CART_FAIL,payload:error.response.data.message})
    }
}

export const getCartItems=()=>async(dispatch)=>{
    try{
        dispatch({type:GET_CART_ITEMS_REQUEST})
        // console.log("working")
        const response=await axios.get(`${BASE_URL}/api/cart`,{withCredentials:true})
        dispatch({type:GET_CART_ITEMS_SUCCESS,payload:response.data.cartItems})
    }catch(error){
        dispatch({type:GET_CART_ITEMS_FAIL,payload:error.response.data.message})
    }
}

export const removeItemFromCart=(id,name)=>async(dispatch)=>{
    try{
        dispatch({type:REMOVE_CART_ITEM_REQUEST})
        const response=await axios.put(`${BASE_URL}/api/cart/remove`,{product:id},{withCredentials:true})
        dispatch({type:REMOVE_CART_ITEM_SUCCESS,payload:response.data})
        toast.success(`${name} removed from cart`)
    }catch(error){
        dispatch({type:REMOVE_CART_ITEM_FAIL,payload:error.response.data.message})
    }

}

// remove all items from cart
export const removeAllItemsFromCart=()=>async(dispatch)=>{
    try{
        dispatch({type:REMOVE_ALL_CART_ITEMS_REQUEST})
        console.log("action working")
        const response=await axios.put(`${BASE_URL}/api/cart/removeall`,{}, {withCredentials:true})
        dispatch({type:REMOVE_ALL_CART_ITEMS_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:REMOVE_ALL_CART_ITEMS_FAIL,payload:error.response.data.message})
    }
}

// export const removeItemFromCart=(id)=>async(dispatch,getState)=>{
//     dispatch({type:REMOVE_FROM_CART,payload:id})
//     localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
// }

export const saveShippingInfo=(data)=>async(dispatch)=>{
    dispatch({type:SAVE_SHIPPING_INFO,payload:data})
    localStorage.setItem('shippingInfo',JSON.stringify(data))
}