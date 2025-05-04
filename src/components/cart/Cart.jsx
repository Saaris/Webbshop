import { useToyStore } from "../../data/toyStore.js"
import "./Cart.css"

const Cart = () => {

    const { cart, increaseToy, decreaseToy } = useToyStore();
    const toyCount = useToyStore(state => state.toyCount)

    return (
        <div className="cart-page">
           <h2>This is your cart</h2>

            {cart.length === 0 ? (
            <p>Your cart is empty</p>
            ) : (
            <ul>
            {cart.map((item, id) => (
                <>
                <li className="cart-item" 
                key={id}>
                     {item.image && (
                    <img 
                    src={item.image} 
                    alt={item.name}/>
                    )}
                    <h3>{item.name}</h3>
                   
                   </li>
                   
                    <div className="price-button-box">
                    <p>{increaseToy}+</p>
                    <p>{toyCount}</p>
                    <p>{decreaseToy}-</p>
                    <p>{item.price}</p>
                    </div>
                    </>
                    
            ))}
            </ul>
        )}
        </div>
           
)}
export default Cart