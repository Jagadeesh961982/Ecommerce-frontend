import { CgMouse } from "react-icons/cg";
import "./Home.css";
import  ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { getProducts } from "../../actions/productAction.js";
import {useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import Loading from "../layout/Loading/Loading.js";

const Home=()=>{
    const dispatch=useDispatch();
    const response=useSelector(state=>state.products);
    // console.log(response);
    const {products,productCount,loading}=response;
    // console.log(products,loading,productCount);
    useEffect(() => {
       dispatch(getProducts());
      }
    , [dispatch])

    
    return(
        <>  
        {loading? <Loading/>:
            <>

            <MetaData title={"Ecommerce"}/>
            
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
                {products && products.map(product=>(
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            </>
        }</>
    )
}

export default Home;