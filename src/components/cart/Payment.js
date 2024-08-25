import React, { useEffect, useRef } from 'react';
import './payment.css';
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/MetaData';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { shippingInfo, cartItems } = useSelector(state => state.allCartItems);
    const { user } = useSelector(state => state.userLoginRegister);
    const { error } = useSelector(state => state.newOrder);

    const order={
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo?.subtotal,
        taxPrice:orderInfo?.tax,
        shippingPrice:orderInfo?.shippingPrice,
        totalPrice:orderInfo?.total,
    }
    
    const paymentData = {
        amount: Math.round(orderInfo?.total * 100),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        
        try {
            const { data } = await axios.post(`${BASE_URL}/api/process/payment`, paymentData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log(data)

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(createOrder(order))
                    sessionStorage.removeItem('orderInfo');
                    
                    navigate('/success');
                } else {
                    payBtn.current.disabled = false;
                    toast.error('Payment Failed');
                }
            }
        } catch (err) {
            payBtn.current.disabled = false;
            toast.error(err.response.data.message);
        }
    };

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors())
        }
    },[dispatch,error])

    return (
        <>
            <MetaData title={'Payment'} />
            <CheckoutSteps activeStep={2} />
            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={handleSubmit}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input type='submit' value={`Pay ₹${orderInfo && orderInfo.total}`} ref={payBtn} className='paymentFormBtn' />
                </form>
            </div>
        </>
    );
};

export default Payment;
