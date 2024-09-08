import React,{useState}from 'react'
import "./products.css"
import { useSelector,useDispatch } from 'react-redux'
import { getProducts,clearErrors } from '../../actions/productAction.js'
import { useEffect } from 'react'
import Loading from '../layout/Loading/Loading.js'
import ProductCard from '../Home/ProductCard.js'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material'
import MetaData from '../layout/MetaData.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const ProductDetails = () => {

    const dispatch=useDispatch();
    const {products,productsCount,filteredProductsCount,resultPerPage,loading,error}=useSelector(state=>state.products);
    // console.log(productsCount,resultPerPage);
    const {keyword}=useParams();
    const categories=[ 'watch','Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home' ];

    const [currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,100000]);
    const [category,setCategory]=useState('');
    const [rating,setRating]=useState(0);
    const [open,setOpen]=useState(false);

    // console.log(category)


    const setCurrentPageNo=(e)=>{
        setCurrentPage(e);
    }

    const handleToggle=(e)=>{
        setOpen(!open);
    }

    // const totalPages=Math.ceil(productsCount/resultPerPage);

    useEffect(()=>{

        dispatch(getProducts(keyword,currentPage,price,category,rating));
        if(error){
            dispatch(clearErrors());
        }
    },[dispatch,error,keyword,currentPage,price,category,rating]);

  return (
    <>
      {loading ? <Loading /> :(
        filteredProductsCount===0 ? <h1 className='noProducts'>No Products Found</h1> :(
        <>
          <MetaData title={'Products --Ecommerce'} />
          <h1 className='productsHeading'>Products</h1>
          <div className='productsPage'>
            <div className='productsPage-1'>
              <h3>Apply Filters</h3>
              <div className='filterBox'>
                <div>
                  <Typography id='Typo'>Price</Typography>
                  <Slider
                      value={price}
                      onChange={(e,newPrice)=>setPrice(newPrice)}
                      valueLabelDisplay='auto'
                      aria-labelledby='range-slider'
                      min={0}
                      max={100000}
                  />
                </div>
                <div>
                  <Typography onClick={handleToggle} id='Typo'>{!open?<ChevronRightIcon/>:<ExpandMoreIcon/>}Categories</Typography>
                  <ul className='categoryBox'>
                    {open && categories.map(category=>(
                      <li key={category} onClick={()=>setCategory(category)}>{category}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <fieldset>
                    <Typography component="legend" id='Typo'>Rating Above</Typography>
                    <Slider 
                      value={rating}
                      onChange={(e,newRating)=>setRating(newRating)}
                      valueLabelDisplay='auto'
                      aria-labelledby='continuous-slider'
                      min={0}
                      max={5}

                    />
                  </fieldset>
                </div>
              </div>
              
            </div>
            <div className='productsPage-2'>
              <div className='productsContainer'>
                {products && products.map(product=>(
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              

              <div className='paginationBox'>
              {(resultPerPage<=filteredProductsCount) &&
                (<Pagination 
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass='pageItemActive'
                  activeLinkClass='pageLinkActive'
                  pageRangeDisplayed={5}

                />)}
              </div>
            </div>
            
          </div>

        </>
      )
      )}
    </>
  )
}

export default ProductDetails