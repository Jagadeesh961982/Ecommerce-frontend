import React, { useState } from 'react'
import './sidebar.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';

// import {SimpleTreeView , TreeItem} from '@mui/x-tree-view'

// import { TreeItem ,TreeView} from '@mui/lab';
import { TreeItem, SimpleTreeView,TreeView } from '@mui/x-tree-view';

const Sidebar = () => {
    const [open,setOpen]=useState(false)

    const handleToggle=()=>{
        setOpen(!open)
    }
  return (
    <div className='sidebar'>
        <Link to='/'>
            <img src={logo} alt='Ecommerce' />
        </Link>
        <Link to='/admin/dashboard'>
            <p>
                <DashboardIcon /> Dashboard
            </p>
        </Link>
        <Link>
            <ul className='adminDashboard' onClick={handleToggle}>
                <div className='adimDashboard-child-1'>
                    <p >{!open?<ExpandMoreIcon />:<ExpandLessIcon/>} Products</p>
                </div>
                {open &&
                (<div className='adimDashboard-child-2'>
                    <li>
                        <Link to='/admin/products'>    
                            <p><PostAddIcon /> All Products</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/product/new'>
                            <p><AddIcon /> Create Product</p>
                        </Link>
                    </li>
                </div>
                )}
                
            </ul>
            </Link>
            <Link to='/admin/orders'>
                <p><ListAltIcon /> Orders</p>
            </Link>
            <Link to='/admin/users'>
                <p><PeopleIcon /> Users</p>
            </Link>
            <Link to='/admin/reviews'> 
                <p><RateReviewIcon /> Reviews</p>
            </Link>
            <Link to='/admin/feedbacks'>
                <p><FeedbackIcon />Feedbacks</p>
            </Link>
    </div>
  )
}

export default Sidebar
