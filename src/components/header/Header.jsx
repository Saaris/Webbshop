import {NavLink} from 'react-router' 
import './Header.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../../assets/Logo.png'
import { useToyStore } from '../../data/toyStore.js'
import productsImg from '../../assets/productsImg.png';



const Header = () => {

    const { toyCount, isLoggedIn } = useToyStore();
    

  return (
    <div className='header'>
    
      <NavLink to="/"><img src={Logo} className='logo'/></NavLink>
         
        <nav className='navbar'>
          {isLoggedIn && <p className="admin-heading">Admin inloggad</p>}

          {!isLoggedIn && (
            <>
           
            <NavLink to="/toys" className='heading'>
              <img src={productsImg} alt="Produkter" className="nav-icon" />
              Produkter
            </NavLink>
              <NavLink to="/cart" className='cart-link'>
              
              <FontAwesomeIcon icon={faCartShopping} />
              {toyCount > 0 && <span className="cart-badge">{toyCount}</span>}
               Varukorg
              </NavLink>
            </>
          )}
        </nav>
    </div>

)}
export default Header