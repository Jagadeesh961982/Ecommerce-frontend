import React, { useEffect, useState } from 'react'
import './newProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createNewProduct } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { Button } from '@mui/material'
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const NewProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, success, product } = useSelector(state => state.newProduct)
    const categories = ['watch', 'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home'];
    const [name, setName] = useState('')
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(null)
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
        // for (let key of formData.entries()) {
        //     console.log(`${key}:${formData.get(key)}`);
        // }
        // console.log(formData)
        dispatch(createNewProduct(formData))
    }
    const productImageChangeHandler = (e) => {
        const files = Array.from(e.target.files)
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
        if (error) {
            if (error.extraDetails !== "") {
                toast.error(error.extraDetails)
            } else {
                toast.error(error.message)
            }
            dispatch(clearErrors())
        }
        if (success) {
            toast.success('Product created successfully')
            dispatch({ type: NEW_PRODUCT_RESET })
            navigate('/admin/dashboard')
        }
    }, [error, dispatch, success, navigate])
    return (
        <>
            <MetaData title="Admin- New Product" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form className='newProductForm' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1>Create New Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type='text' placeholder='Product Name' required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type='number' placeholder='price' required onChange={e => setPrice(e.target.value)} />
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
                            <input type='number' placeholder='stock' required onChange={e => setStock(e.target.value)} />
                        </div>
                        <div id='newProductFormFile'>
                            <input type='file' name='avatar' accept='image/*' onChange={productImageChangeHandler} multiple />
                        </div>
                        <div id="newProductFormImage">
                            {imagesPreview.map((image, ind) => (
                                <img key={ind} src={image} alt='Product avatar' />
                            ))}
                        </div>
                        <Button type='submit' disabled={loading ? true : false} className='createProductBtn'>Create Product</Button>

                    </form>
                
                </div>
            </div>
        </>
    )
}

export default NewProduct