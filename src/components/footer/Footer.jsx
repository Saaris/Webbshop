import './Footer.css'
import twitter from '../../assets/twitter.png'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'


const Footer = () => {


    return (
            <div className="footer-content">
                <p>&copy; 2023 Toy Store. All rights reserved.</p>
                <p>mystoys@outlook.com</p>
                <p>+46 123 456 789</p>
                <p>123 Toy Street, Toy City, Sweden</p>
                <img src={twitter} alt="Twitter" className="social-icon" />
                <img src={facebook} alt="Facebook" className="social-icon" />
                <img src={instagram} alt="Instagram" className="social-icon" />
            </div>
    )
}
export default Footer
