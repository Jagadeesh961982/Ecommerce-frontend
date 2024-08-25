import React,{useState} from 'react'
import './shipping.css'
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingInfo} from '../../actions/cartActions.js'
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country,State} from 'country-state-city'
import MetaData from '../layout/MetaData.js'
import CheckoutSteps from './CheckoutSteps.js';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


const Shipping = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {shippingInfo}=useSelector(state=>state.allCartItems)

    const [address,setAddress]=useState(shippingInfo?.address)
    const [city,setCity]=useState(shippingInfo?.city)
    const [state,setState]=useState(shippingInfo?.state)
    const [country,setCountry]=useState(shippingInfo?.country)
    const [pincode,setPincode]=useState(shippingInfo?.pincode)
    const [phoneNo,setPhoneNo]=useState(shippingInfo?.phoneNo)


    const shippingInfoSubmitHandler=(e)=>{
        e.preventDefault()
        if(phoneNo.length!==10){
            toast.error('Phone no must be 10 digits')
            return
        }
        dispatch(saveShippingInfo({address,city,state,country,pincode,phoneNo}))
        navigate("/order/confirm")

    }
  return (
    <>
        <MetaData title={'Shipping Information'} />
        <CheckoutSteps activeStep={0} />
        <div className='shippingContainer'>
            <div className='shippingBox'>
                <h2 className='shippingHeading'>Shipping Information</h2>

                <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingInfoSubmitHandler}>

                    <div>
                        <HomeIcon />
                        <input type="text" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} required />
                    </div>
                    <div>
                        <LocationCityIcon />
                        <input type="text" placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)} required />
                    </div>
                    <div>
                        <PinDropIcon />
                        <input type="number" placeholder='Pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)} size="6" required />
                    </div>
                    <div>
                        <PublicIcon />
                        <select onChange={(e)=>setCountry(e.target.value)} value={country} required>
                            <option value="">Select Country</option>
                            {Country && Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {country &&(
                    <div>
                        <TransferWithinAStationIcon />
                        <select onChange={(e)=>setState(e.target.value)} value={state} required>
                            <option value="">Select State</option>
                            {State && State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>)}
                    <div>
                        <PhoneIcon />
                        <input type="number" placeholder='Phone no' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} size="10" required />
                    </div>
                    <input type="submit" value='Continue' className='shippingBtn' disabled={state?false:true}/>


                </form>
            </div>
        </div>
    </>
  )
}

export default Shipping