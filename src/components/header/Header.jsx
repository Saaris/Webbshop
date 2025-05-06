import {NavLink} from 'react-router' 
import './Header.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../../assets/Logo.png'
import { useToyStore } from '../../data/toyStore.js'
import adminIcon from '../../assets/adminIcon.png'




const Header = () => {

    const { toyCount } = useToyStore();
    

    return (
        <div className='header'>
         <NavLink to="/"><img src={Logo} className='logo'/></NavLink>
         
          <nav className='navbar'>
            <NavLink to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
             {toyCount > 0 && <span className="cart-badge">{toyCount}</span>}
            </NavLink>
          </nav>
          <NavLink to="/login"><img src={adminIcon} alt='admin icon' className='admin-icon'></img></NavLink>
        </div>

)}
export default Header