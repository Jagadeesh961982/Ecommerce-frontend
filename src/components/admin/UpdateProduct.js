import React, { useEffect, useState } from 'react'
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


const UpdateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id}=useParams()
    const {error, product}=useSelector(state=>state.productDetails)
    const { loading, error:updatedError,isUpdated } = useSelector(state => state.adminProduct)
    const categories = ['watch', 'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home'];
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [category, setCategory] = useState(product.category)
    const [stock, setStock] = useState(product.stock)
    const [oldImages,setOldImages]=useState(product.images)
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])


    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('price', price)
        formData.set('description', description)
        formData.set('category', category)
        formData.set('stock', stock)
        images.forEach((image) => {
            formData.append("images", image);
          });
        dispatch(updateProduct(id,formData))
    }
    const productImageChangeHandler = (e) => {
        const files = Array.from(e.target.files)
        setOldImages([])
        setImages([])
        setImagesPreview([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }
    useEffect(() => {
        if(product && product._id!==id){
            dispatch(getProductDetails(id))
        }
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
            navigate('/admin/products')
        }
    }, [error, dispatch,navigate, updatedError,isUpdated,product,id])
    return (
        <>
            <MetaData title="Admin- Update Product" />
            <div className='dashboard'>
                <Sidebar />
                <div className='updateProductContainer'>
                    <form className='updateProductForm' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1>Update The Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type='text' placeholder='Product Name' required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type='number' value={price} placeholder='price' required onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea placeholder='Product Description' value={description} onChange={e => setDescription(e.target.value)} cols="30" rows="1"></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                <option value=''>Select Category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type='number'value={stock} placeholder='stock' required onChange={e => setStock(e.target.value)} />
                        </div>
                        <div id='updateProductFormFile'>
                            <input type='file' name='avatar' accept='image/*' onChange={productImageChangeHandler} multiple />
                        </div>
                        <div id="updateProductFormImage">
                            {oldImages && oldImages.map((image, ind) => (
                                <img key={ind} src={image.url} alt='Product avatar' />
                            ))}
                        </div>
                        <div id="updateProductFormImage">
                            {images && images.map((image, ind) => (
                                <img key={ind} src={image} alt='Product avatar' />
                            ))}
                        </div>
                        <Button type='submit' disabled={loading ? true : false} className='updateProductBtn'>Update Product</Button>

                    </form>
                
                </div>
            </div>
        </>
    )
}

export default UpdateProduct