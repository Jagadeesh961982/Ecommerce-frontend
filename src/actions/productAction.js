import axios from 'axios';
import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, ALL_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from '../../src/constants/productConstants';


const baseUrl=process.env.REACT_APP_BASE_URL;

export const getProducts=(keyword="",currentPage=1,price=[0,100000],category='',rating=0)=> async (dispatch) =>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST});
        let link=`${baseUrl}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`
        if(category){
            link=`${baseUrl}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
        }
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };
        const response =await axios.get(link,config);
        
        dispatch({type:ALL_PRODUCTS_SUCCESS,payload:response.data});

    }catch(error){
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type:ALL_PRODUCTS_FAIL,payload:errorMessage});
    }
}

export const getProductDetails=(id)=>async (dispatch)=>{

    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const response=await axios.get(`${baseUrl}/api/product/${id}`);  
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:response.data});

    }catch(error){
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:errorMessage});
        
    }
}

export const createNewReview=(data)=>async(dispatch)=>{
    try{
        dispatch({type:NEW_REVIEW_REQUEST})
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          };
        // console.log(data)
        const response=await axios.put(`${baseUrl}/api/review`,data,config)
        // console.log(response)
        dispatch({type:NEW_REVIEW_SUCCESS,payload:response.data.success})
    }catch(error){
        dispatch({type:NEW_REVIEW_FAIL,payload:response.data.message})
    }
}

// Admin Actions

export const getAdminProducts=()=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_PRODUCTS_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };
        const response=await axios.get(`${baseUrl}/api/admin/products`,config)
        dispatch({type:ADMIN_PRODUCTS_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:ADMIN_PRODUCTS_FAIL,payload:error.response.data.message})
    }
}

export const createNewProduct=(productData)=>async(dispatch)=>{
    try{
        dispatch({type:NEW_PRODUCT_REQUEST})
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          };
        const response=await axios.post(`${baseUrl}/api/admin/product/new`,productData,config)
        dispatch({type:NEW_PRODUCT_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:NEW_PRODUCT_FAIL,payload:error.response.data.message})
    }
}

export const deleteProduct=(id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_PRODUCT_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };
        const response=await axios.delete(`${baseUrl}/api/admin/product/${id}`,config)
        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:DELETE_PRODUCT_FAIL,payload:error.response.data.message})
    }
}

export const updateProduct=(id,productData)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PRODUCT_REQUEST})
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          };
        const response=await axios.put(`${baseUrl}/api/admin/product/${id}`,productData,config)
        dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:UPDATE_PRODUCT_FAIL,payload:error.response.data.message})
    }
}

export const getAllProductReviews=(productId)=>async(dispatch)=>{
    try{
        dispatch({type:ALL_REVIEWS_REQUEST})
        // console.log(productId)
        const response=await axios.get(`${baseUrl}/api/reviews?productId=${productId}`)
        dispatch({type:ALL_REVIEWS_SUCCESS,payload:response.data.reviews})
    }catch(error){
        dispatch({type:ALL_REVIEWS_FAIL,payload:error.response.data.message})
    }
}

export const deleteProductReview=(reviewId,productId)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_REVIEW_REQUEST})
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };
        const response=await axios.delete(`${baseUrl}/api/review?id=${reviewId}&productId=${productId}`,config)
        console.log(response)
        dispatch({type:DELETE_REVIEW_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:DELETE_REVIEW_FAIL,payload:error.response.data.message})
    }
}

export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}
