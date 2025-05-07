import { useToyStore } from "../../data/toyStore.js";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart, updateCartQuantity } = useToyStore();

  return (
    <div className="cart-container">
      <p className="cart-info">Detta är din varukorg</p>
      <div className="cart-page">
        {cart.length === 0 ? (
          <p>Din varukorg är tom</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <li className="cart-item" key={item.id}>
                {item.image && (
                  <img src={item.image} alt={item.name} />
                )}
                <p>{item.name}</p>
                <div className="price-button-box">
                  <p>
                    <FontAwesomeIcon
                      onClick={() => updateCartQuantity(item.id, 1)} 
                      icon={faCirclePlus}
                      className="icon-button"
                    />
                  </p>
                  <p>{item.quantity} st</p> 
                  <p>
                    <FontAwesomeIcon
                      onClick={() => updateCartQuantity(item.id, -1)} 
                      icon={faCircleMinus}
                      className="icon-button"
                    />
                  </p>
                  <p>{item.price}</p>
                </div>
              </li>
            ))}
            <section className="total-price">
              <p>Totalt pris:</p>
              <button className="checkout-button">Betala</button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;