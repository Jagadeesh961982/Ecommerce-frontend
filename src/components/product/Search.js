import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './search.css'
import MetaData from '../layout/MetaData';
const Search = () => {
    const navigate=useNavigate();

    const [keyword,setKeyword]=useState('');

    const SearchSubmitHandler=(e)=>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`)
        }
        
    
    }
  return (
    <>  
        <MetaData title={'Search Products --Ecommerce'} />
        <form className='searchBox' onSubmit={SearchSubmitHandler}>
            <input type='text' placeholder='Search a product...' onChange={e=>setKeyword(e.target.value)}/>
            <input type='submit' value='Search'/>
        </form>

    </>
  )
}

export default Search