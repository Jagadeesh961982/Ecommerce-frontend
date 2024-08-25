
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css';

const Footer=()=>{
    return(
        <footer className="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and ios mobile phone</p>
                <div className="appLogo">
                    <img src={playStore} alt="google play store" />
                    <img src={appStore} alt="apple app store" />
                </div>
            </div>
            <div className="middleFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our priority</p>
                <p>copyrights 2024 &copy; Jagadeesh</p>
            </div>
            <div className="rightFooter">
                <h4>FOLLOW US ON</h4>
                <a href="https://www.facebook.com/"><i className="fab fa-facebook">Facebook</i></a>
                <a href="https://www.instagram.com/"><i className="fab fa-instagram">Instagram</i></a>
                <a href="https://www.twitter.com/"><i className="fab fa-twitter">Twitter</i></a>
            </div>
        </footer>
    )
}

export default Footer;