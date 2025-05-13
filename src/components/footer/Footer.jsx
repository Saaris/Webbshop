import './Footer.css'
import twitter from '../../assets/twitter.png'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import {NavLink} from 'react-router' 
import adminIcon from '../../assets/adminIcon.png'
import { useState } from 'react';
import { useToyStore } from '../../data/toyStore.js'

const Footer = () => {
  const { isLoggedIn, handleLogout } = useToyStore();



    return (
            <div className="footer-content">
                <div className="tooltip-wrapper" onClick={handleLogout}>
  <img
    src={adminIcon}
    alt="admin icon"
    className="admin-icon"
  />
  <span className="custom-tooltip">
    {isLoggedIn ? "logga ut" : "logga in"}
  </span>
</div>

                <p>&copy; 2023 MyToys Aktiebolag</p>
                <p>mystoys@outlook.com</p>
                <p>+46 123 456 789</p>
                <p>Redegatan 2, 42121, Sverige</p>
                    <div className="icons-container">
                        <img src={twitter} alt="Twitter" 
                        className="social-icon" />
                        <img src={facebook} alt="Facebook" className="social-icon" />
                        <img src={instagram} alt="Instagram" className="social-icon" />
                    </div>
            </div>
    )
}
export default Footer
