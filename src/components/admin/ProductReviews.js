import React, { useEffect, useState } from 'react';
import './productReviews.css';
import { useDispatch,useSelector } from 'react-redux';
import { DELETE_PRODUCT_RESET, DELETE_REVIEW_RESET } from '../../constants/productConstants.js';
import { clearErrors, deleteProductReview, getAllProductReviews } from '../../actions/productAction.js';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData.js';
import Loading from '../layout/Loading/Loading.js';
import Sidebar from './Sidebar.js';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProductReviews = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {reviews,loading,error}=useSelector(state=>state.productReviews)
  const {error:deleteError,isDeleted}=useSelector(state=>state.adminReview)
  console.log(isDeleted)

  const [productId,setProductId]=useState("")

  const columns = [
    {field :"id",headerName:"Review Id",minWidth:200,flex:0.5},
    {field :"user",headerName:"User",minWidth:350,flex:0.5},
    {field :"comment",headerName:"Comment",minWidth:350,flex:1},
    {field :"rating",headerName:"Rating",minWidth:100,flex:0.3},
    {field : "actions",headerName:"Actions",type:"number",minWidth:100,flex:0.3,sortable:false,
      renderCell:(params)=>{
        return(
          <>
            <Button onClick={()=>handleDeleteReview(params.id,productId)}>
              <DeleteIcon />
            </Button>
          </>
        )
      }},]
  const rows = []
  
  reviews && reviews.map((review)=>(
    rows.push({
      id:review._id,
      user:review.name,
      comment:review.comment,
      rating:review.rating,
      
    })
  ))

  const handleDeleteReview=(id,productId)=>{
    dispatch(deleteProductReview(id,productId))
  }
  
  const productReviewSubmitHandler=(e)=>{
    e.preventDefault()
    dispatch(getAllProductReviews(productId))
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
      toast.success(isDeleted.message)
      dispatch({type:DELETE_REVIEW_RESET})
      dispatch(getAllProductReviews(productId))
      navigate('/admin/reviews')
    }
  },[error,dispatch,deleteError,isDeleted])
  return (
    <>
      <MetaData title="Admin- All Reviews" />
      {
        loading ? <Loading />:(
          <>
            <div className='dashboard'>
              <Sidebar />
              <div className='productReviewsContainer'>
                    <form className='productReviewForm' onSubmit={productReviewSubmitHandler}>
                        <h1 className='productReviewFormHeading'>ALL REVIEWS</h1>
                        <div>
                            <StarIcon />
                            <input type='text' placeholder='Product Id' value={productId} required onChange={e=>setProductId(e.target.value)}/>
                        </div>
                        <Button type='submit' disabled={productId ===" " ? true : false || loading?true:false} id='productReviewBtn'>Search</Button>

                    </form>
                    {(reviews && reviews.length>0) ? (
                        <DataGrid 
                        columns={columns}
                        rows={rows}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                        />) : <h1 className='productReviewsFormHeading'>No Reviews Found</h1>}
                
              </div>
            </div>
          </>
        )
      }
    </>
  )
}


export default ProductReviews