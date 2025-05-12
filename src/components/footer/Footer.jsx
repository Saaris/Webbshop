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
                <div className='admin-icon-container'>
                 <NavLink to="/login">
                    <img
                        src={adminIcon}
                        alt="admin icon"
                        className='admin-icon'
                        title={isLoggedIn ? "logga ut" : "logga in"}
                        onClick={handleLogout} 
                    />
                 </NavLink>
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
