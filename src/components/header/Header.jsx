import {NavLink} from 'react-router' 
import './Header.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../../assets/Logo.png'




const Header = () => {

    

    return (
        <div className='header'>
          
        <img src={Logo} className='logo' />
          <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toys">Toys</NavLink>

            <NavLink to="/cart">
            <FontAwesomeIcon icon={faCartShopping}  /></NavLink>
          </nav>
        </div>

)}
export default Header