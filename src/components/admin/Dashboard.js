import React, { useEffect } from 'react'
import './dashboard.css'
import Sidebar from './Sidebar.js'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Doughnut,Line } from 'react-chartjs-2';
import { Chart, CategoryScale,LinearScale, PointElement, LineElement,ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAdminProducts } from '../../actions/productAction.js'
import { toast } from 'react-toastify'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUseres } from '../../actions/userAction.js'

Chart.register(CategoryScale,LinearScale, PointElement, LineElement,ArcElement, Title, Tooltip, Legend);
const Dashboard = () => {
  const dispatch=useDispatch()
  const {error,products}=useSelector(state=>state.products)
  const {orders,totalAmount}=useSelector(state=>state.allOrders)
  const {users}=useSelector(state=>state.allUsers)
  // const {orders}=useSelector(state=>state.orders)
  // const {users}=useSelector(state=>state.users)

  let outOfStock=0;
  let inStock=0;
  products && products.forEach(product=>{
    if(product.stock===0){
      outOfStock+=1;
    }else{
      inStock+=1;
    }
  })

  const lineState = {
    labels:["Initial Amount","Amount Earned"],
    datasets:[
      {
        label:"Total Amount",
        backgroundColor:"tomato",
        hoverBackgroundColor:"rgb(197,72,49",
        data:[0,Math.round(totalAmount*100)/100],
      },
    ],
  }

  const doughnutState={
    labels:["Out of Stock", "In Stock"],
    datasets:[
      {
        backgroundColor:["#00A6B4","#6800B4"],
        hoverBackgroundColor:["#4B5000","#35014F"],
        data:[outOfStock,inStock],
      }
    ]
  }

  useEffect(()=>{
    if(error){
      if(error.extraDetails!==""){
        toast.error(error.extraDetails)
      }else{
        // console.log(error)
        toast.error(error.message)
      }
          dispatch(clearErrors())
      }
    dispatch(getAdminProducts())
    dispatch(getAllOrders())
    dispatch(getAllUseres())
  },[dispatch,error])
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer' >
            <Typography component="h1">Dashboard</Typography>
            <div className='dashboardSummary'>
              <div className='dashboardSummaryBox1'>
                <p>Total Amount <br />{Math.round(totalAmount*100)/100}</p>
              </div>
              <div className='dashboardSummaryBox2'>
                <Link to='/admin/products'>
                  <p>Products</p>
                  <p>{products?.length}</p>
                </Link>
                <Link to='/admin/orders'>
                  <p>Orders</p>
                  <p>{orders?.length}</p>
                </Link>
                <Link to='/admin/users'>
                  <p>Users</p>
                  <p>{users?.length}</p>
                </Link>
              </div>
            </div>
            <div className='lineChart'>
              <Line data={lineState} options={{ responsive: true, plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
            </div>
            <div className='doughnutChart'>
              <Doughnut data={doughnutState} options={{ responsive: true, plugins: { legend: { display: true }, tooltip: { enabled: true } } }} />
            </div>
        </div>

    </div>
  )
}

export default Dashboard