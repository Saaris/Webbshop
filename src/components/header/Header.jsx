import {NavLink} from 'react-router' 

const Header = () => {

    return (
        <div className='header'>
        <h1>MyToys</h1>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toys">Toys</NavLink>
            <NavLink to="/cart">Cart</NavLink>
          </nav>
        </div>

)}
export default Header