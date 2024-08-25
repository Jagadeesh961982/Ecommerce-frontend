import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';


const productCard = (product) => {
    product=product.product;
    const options = {
        size:"medium",
        value:product?.rating || 0,
        readOnly:true,
        precision:0.5,
    };
    return (
        <Link to={`/product/${product._id}`} className='productCard'>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} /> <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
            </div>
            <span>₹{product.price}</span>
        </Link>
    );
};


export default productCard;