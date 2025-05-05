import {NavLink} from 'react-router' 
import './Header.css'
import { faCartShopping, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../../assets/Logo.png'
import { useToyStore } from '../../data/toyStore.js'




const Header = () => {

    const { toyCount } = useToyStore();
    

    return (
        <div className='header'>
        <img src={Logo} className='logo' />

          <nav className='navbar'>
            <NavLink to="/">Hem</NavLink>
            <NavLink to="/toys">Leksaker</NavLink>

            <NavLink to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
             {toyCount > 0 && <span className="cart-badge">{toyCount}</span>}
            </NavLink>
          </nav>
          <NavLink to="/login"><FontAwesomeIcon icon={faLock} classname='lock' /></NavLink>
        </div>

)}
export default Header