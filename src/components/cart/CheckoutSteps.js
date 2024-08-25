import React from 'react'
import './checkoutSteps.css'
import { Stepper, Step, StepLabel, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const CheckoutSteps = ({activeStep}) => {
    const steps=[
        {lable:<Typography>ShippingInfo</Typography>,
        icon:<LocalShippingIcon />
        },
        {lable:<Typography>Confirm Order</Typography>,
        icon:<LibraryAddCheckIcon />
        },
        {lable:<Typography>Payment</Typography>,
        icon:<AccountBalanceIcon />
        },
    ]
    const stepStyles={
        boxSizing:'border-box',
    }
  return (
    <>
        <div className='checkoutSteps'>
            <Stepper activeStep={activeStep} style={stepStyles}>
                {steps.map((step,index)=>(
                    <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                        <StepLabel icon={step.icon} style={{color:activeStep>=index?"tomato":"rgba(0,0,0,0.649)",
                        }}>{step.lable}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    </>
  )
}

export default CheckoutSteps