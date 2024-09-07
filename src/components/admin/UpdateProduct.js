import React, { Children, useEffect, useState } from 'react'
import './updateProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createNewProduct, getProductDetails, updateProduct } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { Button } from '@mui/material'
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../layout/Loading/Loading'


const UpdateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id}=useParams()
    const {error, product,loading:loadProduct}=useSelector(state=>state.productDetails)
    const { loading, error:updatedError,isUpdated } = useSelector(state => state.adminProduct)
    const categories = ['watch', 'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home'];
    const [productDetails, setProductDetails] = useState({name:product?.name,price:product?.price,description:product?.description,category:product?.category,stock:product?.stock,oldImages:product?.images})
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])


    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', productDetails?.name)
        formData.append('price', productDetails?.price)
        formData.append('description',productDetails?.description)
        formData.append('category', productDetails?.category)
        formData.append('stock', productDetails?.stock)
       
        // console.log("new images",images)
        images?images.forEach((image) => {
            formData.append("images", image);
          }):formData.append("images",[]);

        dispatch(updateProduct(id,formData))
    }
    const productImageChangeHandler = (e) => {
        const files = Array.from(e.target.files)
        setProductDetails({...productDetails,oldImages:[]})
        setImages([])
        setImagesPreview([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, file]);
                }
            }
            reader.readAsDataURL(file);
        })
       
    }

    useEffect(()=>{
        if(!product || product._id!==id){
            dispatch(getProductDetails(id))
        }
    },[dispatch,id])
    useEffect(()=>{
        
        if(product){
            setProductDetails({
                name:product.name,
                price:product.price,
                description:product.description,
                category:product.category,
                stock:product.stock,
                oldImages:product.images
            })
        }
    },[product,dispatch])
    useEffect(() => {
        if (error) {
            toast.error(error.extraDetails||error.message)
            dispatch(clearErrors())
        }
        if (updatedError) {
            toast.error(updatedError.extraDetails||updatedError.message)
            dispatch(clearErrors())
        }
        if (isUpdated?.success) {
            toast.success("Product updated successfully")
            dispatch({ type: UPDATE_PRODUCT_RESET })
            dispatch(getProductDetails(id))
            navigate('/admin/products')
        }
    }, [error, dispatch,navigate, updatedError,isUpdated])
    return (
        <>
            <MetaData title="Admin- Update Product" />
            <div className='dashboard'>
                <Sidebar />
                {loading ?<Loading/>:(<div className='updateProductContainer'>
                    <form className='updateProductForm' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1>Update The Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type='text' placeholder='Product Name' required value={productDetails.name} onChange={e => setProductDetails({...productDetails,name:e.target.value})} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type='number' value={productDetails.price} placeholder='price' required onChange={e => setProductDetails({...productDetails,price:e.target.value})} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea placeholder='Product Description' value={productDetails.description} onChange={e => setProductDetails({...productDetails,description:e.target.value})} cols="30" rows="1"></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={productDetails.category} onChange={e => setProductDetails({...productDetails,category:e.target.value})}>
                                <option value=''>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type='number' value={productDetails.stock} placeholder='stock' required onChange={e => setProductDetails({...productDetails,stock:e.target.value})} />
                        </div>
                        <div id='updateProductFormFile'>
                            <input type='file' name='avatar' accept='image/*' onChange={productImageChangeHandler} multiple />
                        </div>
                        <div id="updateProductFormImage">
                            {productDetails.oldImages && productDetails.oldImages.map((image, ind) => (
                                <img key={ind} src={image.url} alt='Product avatar' />
                            ))}
                        </div>
                        <div id="updateProductFormImage">
                            {imagesPreview && imagesPreview.map((image, ind) => (
                                <img key={ind} src={image} alt='Product avatar' />
                            ))}
                        </div>
                        <Button type='submit' disabled={loading ? true : false} className='updateProductBtn'>Update Product</Button>

                    </form>
                
                </div>)}
            </div>
        </>
    )
}

export default UpdateProduct