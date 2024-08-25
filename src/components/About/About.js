import React from 'react'
import './About.css';
import profilePic from '../../images/profilePic.jpg';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutSection">
        <div>
            <h2>About Us</h2>
            <p>
            At <strong>Ecommerce</strong>, we are dedicated to providing you with the finest selection of products across various categories, ensuring quality and satisfaction with every purchase. Our mission is to bring you a seamless online shopping experience, where you can find everything you need in one place.
            </p>
        </div>
        <div>
            <h3>Our Story</h3>
            <p>
            Founded by <strong>Tanakala Jagadeesh</strong>, an experienced Analytic Administrator at Jio Infocomm Limited, Ecommerce was born out of a passion for e-commerce and a commitment to delivering top-notch products to customers. With a keen eye for detail and a dedication to excellence, Jagadeesh has leveraged his expertise to create a platform that prioritizes quality, reliability, and customer satisfaction.
            </p>
            </div>
        <div>
        <h3>Why Choose Us?</h3>
            <ul>
            <li><strong>Quality Products:</strong> We handpick each item in our catalog to ensure it meets the highest standards.</li>
            <li><strong>Diverse Categories:</strong> From electronics to fashion, home essentials to beauty products, we have something for everyone.</li>
            <li><strong>Customer-Centric Service:</strong> Your satisfaction is our priority. We strive to offer exceptional service at every step of your shopping journey.</li>
            </ul>
        </div>
      </div>

      <div className="aboutSection">
        <div>
            <h2>Meet the Founder</h2>
        </div>
        <div>
            <img src={profilePic} alt='profilePic' className='profilePic'/>
            <p><strong>Tanakala Jagadeesh</strong></p>
            <p>Analytic Administrator at Jio Infocomm Limited</p>
        </div>
        <div>
            <p>
            With years of experience in analytics and a deep understanding of market trends, Jagadeesh has translated his knowledge into building a robust e-commerce platform that caters to a wide range of customer needs.
            </p>
        </div>
        <h3>Connect with Me</h3>
        <ul>
          <li><a href="[LinkedIn Profile Link]" target="_blank" rel="noopener noreferrer"><InstagramIcon/></a></li>
          <li><a href="[Twitter Profile Link]" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a></li>
          <li><a href="[Instagram Profile Link]" target="_blank" rel="noopener noreferrer"><XIcon/></a></li>
          <li><a href="[Facebook Profile Link]" target="_blank" rel="noopener noreferrer"><FacebookIcon/></a></li>
        </ul>
      </div>
    </div>
  );
}

export default About



