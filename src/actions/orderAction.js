import axios from "axios";
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstants";
import { isAction } from "@reduxjs/toolkit";
import { getCartItems, removeAllItemsFromCart } from "./cartActions";

const BASE_URL = "http://localhost:5000";


// cerate order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${BASE_URL}/api/order/new`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
    dispatch(removeAllItemsFromCart())
    dispatch(getCartItems())
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all orders
export const getMyorders=()=>async(dispatch)=>{
  // console.log("from getMyorders")
    try {
        dispatch({type:MY_ORDERS_REQUEST})
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
    
        const response=await axios.get(`${BASE_URL}/api/orders/me`,config)
        // console.log(response)
        dispatch({type:MY_ORDERS_SUCCESS,payload:response.data.orders})
    }catch(error){
        dispatch({type:MY_ORDERS_FAIL,payload:error.response.data.message})
    }
}

// get order details
export const getOrderDetails=(id)=>async(dispatch)=>{
  try{
    dispatch({type:ORDER_DETAILS_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const {data}=await axios.get(`${BASE_URL}/api/order/${id}`,config)
    dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order})
  }catch(error){
    dispatch({type:ORDER_DETAILS_FAIL,payload:error.response.data.message})
  }
}


// Admin actions

// get all orders
export const getAllOrders=()=>async(dispatch)=>{
  try{
    dispatch({type:ALL_ORDERS_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response=await axios.get(`${BASE_URL}/api/admin/orders`,config)
    dispatch({type:ALL_ORDERS_SUCCESS,payload:response.data})
  }catch(error){
    dispatch({type:ALL_ORDERS_FAIL,payload:error.response.data.message}) 
  }
}

// update order
export const updateOrder=(id,orderStatus)=>async(dispatch)=>{
  try{
    dispatch({type:UPDATE_ORDER_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response=await axios.put(`${BASE_URL}/api/admin/order/${id}`,orderStatus,config)
    dispatch({type:UPDATE_ORDER_SUCCESS,payload:response.data.success})
  }catch(error){
    dispatch({type:UPDATE_ORDER_FAIL,payload:error.response.data.message})
  }
}

// delete order
export const deleteOrder=(id)=>async(dispatch)=>{
  try{
    dispatch({type:DELETE_ORDER_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response=await axios.delete(`${BASE_URL}/api/admin/order/${id}`,config)
    dispatch({type:DELETE_ORDER_SUCCESS,payload:response.data})
  }catch(error){
    dispatch({type:DELETE_ORDER_FAIL,payload:error.response.data.message})
  }
}

export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}