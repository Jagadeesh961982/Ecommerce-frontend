import { CgMouse } from "react-icons/cg";
import "./Home.css";
import  ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { getProducts } from "../../actions/productAction.js";
import {useDispatch,useSelector} from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading/Loading.js";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Home=()=>{
    const dispatch=useDispatch();
    const response=useSelector(state=>state.products);
    // console.log(response);
    const {products,productCount,loading}=response;
    const [slidesToShow,setSlidesToShow]=useState(4);

    const updateSlidesToShow = () => {
        if (window.innerWidth > 660) {
          setSlidesToShow(5);
        } else {
          setSlidesToShow(3);
        }
      };
    // console.log(products,loading,productCount);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        // autoplaySpeed: 1500 ,
        lazyLoad: 'ondemand'
      };
    useEffect(() => {
        updateSlidesToShow(); // Call on mount
        window.addEventListener("resize", updateSlidesToShow); // Update on window resize
        
        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", updateSlidesToShow);
        };
    }, []);
    useEffect(() => {
       dispatch(getProducts());
      }
    , [dispatch])

    
    return(
        <>  
        {loading? <Loading/>:
            <>

            <MetaData title={"Ecommerce"}/>
            <div className="homePage">
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>Find Amazing Products Below</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse />
                        </button>
                    </a>
                </div>
                <h2 className="homeHeading">Featured Products</h2>
                <div className="container" id="container">
                    <Slider {...settings} className="slider">
                        {products && products.map(product=>(
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </Slider>
                </div>
                <div className="loadMore">
                    <Link to="/products">Explore More Products</Link>
                </div>
                </div>
            </>
        }</>
    )
}

export default Home;