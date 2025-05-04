import {NavLink} from 'react-router' 
import './Header.css'
import Vector from '../../assets/Vector.png'
import Logo from '../../assets/Logo.png'
import { useToyStore } from '../../data/toyStore.js'



const Header = () => {



    return (
        <div className='header'>
          
        <img src={Logo} className='logo' />
          <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toys">Toys</NavLink>

            <NavLink to="/cart">
            <img src={Vector} className='cart' alt="Cart"/></NavLink>
          </nav>
        </div>

)}
export default Header