import React, { useEffect } from 'react';
import './productList.css';
import { useDispatch,useSelector } from 'react-redux';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants.js';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction.js';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../layout/MetaData.js';
import Loading from '../layout/Loading/Loading.js';
import Sidebar from './Sidebar.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {products,loading,error}=useSelector(state=>state.products)
  const {error:deleteError,isDeleted}=useSelector(state=>state.adminProduct)

  const columns = [
    {field :"id",headerName:"Product Id",minWidth:200,flex:0.5},
    {field :"name",headerName:"Name",minWidth:350,flex:1},
    {field :"stock",headerName:"Stock",type:"number",minWidth:150,flex:0.3},
    {field :"price",headerName:"Price",type:"number",minWidth:270,flex:0.5},
    {field : "actions",headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,
      renderCell:(params)=>{
        return(
          <>
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=>handleDeleteProduct(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        )
      }},]
  const rows = []
  
  products && products.map((product)=>(
    rows.push({
      id:product._id,
      name:product.name,
      stock:product.stock,
      price:product.price
    })
  ))

  const handleDeleteProduct=(id)=>{
    dispatch(deleteProduct(id))
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
      toast.success(isDeleted?.message)
      dispatch({type:DELETE_PRODUCT_RESET})
      navigate('/admin/dashboard')
    }
      dispatch(getAdminProducts())
  },[error,dispatch,deleteError,isDeleted])
  return (
    <>
      <MetaData title="Admin- All Products" />
      {
        loading ? <Loading />:(
          <>
            <div className='dashboard'>
              <Sidebar />
              <div className='productListContainer'>
                <h1 id='productListHeading'>ALL PRODUCTS</h1>

                <DataGrid 
                  columns={columns}
                  rows={rows}
                  pageSize={10}
                  disableSelectionOnClick
                  className='productListTable'
                  autoHeight
                />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default ProductList