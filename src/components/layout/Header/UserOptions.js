import React, { useState } from 'react'
import "./Header.css"
import { Backdrop } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import profile from '../../../images/Profile.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../actions/userAction';

const UserOptions = ({user,items}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [open, setOpen] = useState(false);
    const actions = [
        { icon: <PersonIcon />, name: 'Profile', func:account},
        { icon: <ShoppingCartIcon style={{color:items.length>0?"tomato":"unset"}}/>, name: `Cart(${items.length})`, func:Cart},
        { icon: <ListAltIcon />, name: 'Orders', func:orders},
        { icon: <ExitToAppIcon />, name: 'Logout', func:logoutUser },
      ];
    if(user.isAdmin){
        actions.unshift({icon:<DashboardIcon />,name:'Dashboard',func:dashboard})
    }
    function dashboard(){
        // console.log('Dashboard')
        navigate('/admin/dashboard')
    }
    function account(){
        // console.log('Account')
        navigate('/account')
    }
    function Cart(){
        // console.log('Cart')
        navigate('/cart')
    }
    function orders(){
        // console.log('Orders')
        navigate('/orders')
    }
    function logoutUser(){
        dispatch(userLogout())
        toast.success('Logged out successfully')
        navigate('/login') 
    }
  return (
    <>
        <Backdrop open={open} style={{zIndex:9}}/>
        <SpeedDial 
                ariaLabel='SpeedDial tooltip example'
                onClose={()=>setOpen(false)}
                onOpen={()=>setOpen(true)}
                open={open}
                style={{zIndex:10}}
                direction='down'
                icon={<img src={user.avatar.url?user.avatar.url:profile} alt={user.name} className='speedDialIcon' /> }
                className='speedDial'
                
                >
                {actions.map((action)=>(
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                        tooltipOpen={window.innerWidth<660?true:false}
                    />
                ))}

        </SpeedDial>
    </>
  )
}

export default UserOptions