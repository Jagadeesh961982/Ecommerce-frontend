import "./productDetails.css";
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import {useDispatch,useSelector} from "react-redux";
import { clearErrors, createNewReview, getProductDetails } from '../../actions/productAction.js';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard.js';
import Loading from '../layout/Loading/Loading.js';
import MetaData from '../layout/MetaData.js';
import { addItemToCart, getCartItems } from '../../actions/cartActions.js';
import {toast} from "react-toastify";
import { Dialog,DialogActions,DialogContent,DialogTitle,Button, Rating } from '@mui/material';
import { ADD_TO_CART_RESET } from '../../constants/cartConstants.js';
import { getMyorders } from '../../actions/orderAction.js';


const ProductDetails=()=>{
    const {id}=useParams();
    const dispatch=useDispatch();
    const {product,loading,error}=useSelector(state=>state.productDetails);
    const {orders} = useSelector(state => state.myOrders)
    const {message}=useSelector(state=>state.cartItem)
    const {success,error:reviewError}=useSelector(state=>state.review)
    const [quantity,setQuantity]=useState(1);
    const [open,setOpen]=useState(false)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState("")
    
    let isOrdered;
    if(orders){
      for(let order of orders){
        for(let item of order.orderItems){
          if(item.product===id){
            isOrdered=true
            break;
          }
        }
      }
    }
   

    const increaseQuantity=()=>{
      if(product.stock>quantity && quantity<5){
          setQuantity(quantity+1);
      }
      
    }

    const decreaseQuantity=()=>{
      if(quantity>1){
        setQuantity(quantity-1);
      }
    }

    const addToCartHandler=()=>{
      if(product.stock===0){
        toast.error("This item is currently out of Stock")
        return
      }
      const cartItem={
        product:product._id,
        name:product.name,
        price:product.price,
        image:product.images[0].url,
        stock:product.stock,
        quantity
      }
      dispatch(addItemToCart(cartItem));
    }

    const sumbitReviewToggle=()=>{
      open?setOpen(false):setOpen(true)
    }

    const submitReviewHandler=()=>{
      const myForm=new FormData()
      myForm.set("rating",rating)
      myForm.set("comment",comment)
      myForm.set("productId",id)
      dispatch(createNewReview(myForm))
      setOpen(false)
    }

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
        if(reviewError){
          if(reviewError.extraDetails!==""){
            toast.error(reviewError.extraDetails)
          }else{
            // console.log(error)
            toast.error(reviewError.message)
          }
              dispatch(clearErrors())
          }
        if(message){
          dispatch(getCartItems())
          dispatch({type:ADD_TO_CART_RESET})
          
        }
        if(success){
          toast.success("Review saved successfully")
        }
      dispatch(getProductDetails(id));
      dispatch(getMyorders())
    },[dispatch,id,error,reviewError,success,message]);
    
    const options = {
      size:"large",
      value:product?.rating || 0,
      readOnly:true,
      precision:0.5,
  };
    
    const responsive = {
      superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
      },
      desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
      },
      tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
      },
      mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
      }
  };



  return (
    <>
    {loading?<Loading />:
    (<>
      <MetaData title={`${product.name} --Ecommerce`} />
      <div className='productDetails'>
  
          {product.images &&
            <div className='carouselContainer'>
              <Carousel responsive={responsive} style={{zIndex:10}}>
                  {product.images.map((image) => (
                    <div key={image._id}>
                      <img src={image.url} alt={product.name} className='carouselImg' />
                    </div>
                  ))}
              </Carousel>
            </div>
          }
          
          
          <div className='productInfo'>
              <div className='productInfoBl-1'>
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className='productInfoBl-2'>
                <Rating {...options} /> 
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className='productInfoBl-3'> 
                <h3>Price: ₹{product.price}</h3>
                <div className='productInfoBl-3-1'>
                  <div className='productInfoBl-3-1-1'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type='number'/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                    Status:
                      <b className={product.stock<1?"redColor":"greenColor"}>
                        {product.stock<1?"Out of Stock":"In Stock"}
                      </b>
                </p>
              </div>
              <div className='productInfoBl-4'>
                <h1>Decription:</h1>
                <p>{product.description}</p>
                <button onClick={sumbitReviewToggle}>Submit Review</button>
              </div>
          </div>
      </div>
      <Dialog aria-labelledby='simple-dialog-title'
        open={open}
        onClose={sumbitReviewToggle}
      >
      {!isOrdered ? (
        <>
          <DialogTitle>Not Ordered ?😬</DialogTitle>
          <DialogContent>
            <p>You can only submit a review for a product you have ordered</p>
          </DialogContent>

        </>) :(
        <>
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className='submitDialog'>
            <Rating name="simple-controlled"
              value={rating}
              onChange={(e) => {
              setRating(e.target.value);}}
              size="large"
            />
            <textarea
              className='submitDialogTextArea'
              cols="30"
              rows="5" 
              value={comment}
              onChange={e=>setComment(e.target.value)}
            >

            </textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={sumbitReviewToggle} color='secondary'>Cancel</Button>
            <Button onClick={submitReviewHandler} color='primary'>Submit</Button>
          </DialogActions>
        </>
      )}
      </Dialog>
      <div className='reviewHeading'>
        <h2>Reviews</h2>
        {product.reviews && product.reviews[0] ?
        (<div className='reviews'>{
          product.reviews.map((review)=>(
            <ReviewCard review={review} />
          ))
        }
        </div>):((<p className='noReviews'>No Reviews Yet</p>))}
      </div>
    </>)
}
</>
);
}

export default ProductDetails;