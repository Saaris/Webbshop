import { useToyStore } from "../../data/toyStore.js"
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {

    const { cart, increaseToy, decreaseToy, toyCount } = useToyStore();
    

    return (
        <div className="cart-container">
            <p className='cart-info'>Detta är din varukorg</p>
        <div className="cart-page">
           
            {cart.length === 0 ? (
            <p>Din varukorg är tom</p>
            ) : (
            <div>
            {cart.map((item) => (
                
                <li className="cart-item" 
                key={item.id}>
                     {item.image && (
                    <img 
                    src={item.image} 
                    alt={item.name}/>
                    )}
                    <h3>{item.name}</h3>
                   
                   <div className="price-button-box">
                        <p>
                            <FontAwesomeIcon
                            onClick={increaseToy}
                            icon={faCirclePlus}
                            className="icon-button"
                            />
                        </p>
                        
                        <p>{toyCount} st</p>
                        
                        <p>
                            <FontAwesomeIcon
                            onClick={decreaseToy}
                            icon={faCircleMinus}
                            className="icon-button"
                            />
                        </p>
                        
                        <p>{item.price}</p>
                    </div>
                </li>
                ))}
            </div>
        )}
        </div> 
    </div>     
)}
export default Cart