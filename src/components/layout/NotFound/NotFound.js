import React from 'react'
import './notfound.css'
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
   <>
    <div className='notfoundContainer'>
        <div className='notfoundBox'>
            <ErrorIcon />
            <p>Page Not Found</p>
            <Link to='/'><button>Go Home</button></Link>
        </div>
    </div>
   </>
  )
}

export default NotFound