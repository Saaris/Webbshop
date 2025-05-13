import './Pay.css';
import { NavLink } from 'react-router';

const Pay = () => {
    return (
        <div className="pay">
        <h2>Tack för ditt köp!</h2>
        <p>Du får en orderbekräftelse via mail. Ditt ordernummer är: 12334</p>
         <NavLink to="/toys">
            <button className="shop-button">Handla mer</button>
         </NavLink>
        </div>
    )
}
export default Pay;