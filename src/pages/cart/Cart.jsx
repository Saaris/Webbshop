import { useToyStore } from "../../data/toyStore.js";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router'

const Cart = () => {
  const { cart, clearCart, updateCartQuantity, totalPrice } = useToyStore();

  const navigate = useNavigate();

   const handleCheckout = () => {
    clearCart();
    navigate('/pay')
  };


  return (
    <div className="cart-container">
      <p className="cart-info">Detta är din varukorg</p>
      <div className="cart-page">
        {cart.length === 0 ? (
          <div className="cart-empty">
          <p>Din varukorg är tom. Klicka på produkter för att se vårt sortiment.</p>
           <NavLink to="/toys">
              <button className="shop-button">Se våra leksaker</button>
           </NavLink>
          </div>
          
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
                      onClick={() => updateCartQuantity(item.id, -1)}
                      icon={faCircleMinus}
                      className="icon-button"
                    />
                  </p>
                  <p>{item.quantity} st</p>
                  <p>
                    <FontAwesomeIcon
                      onClick={() => updateCartQuantity(item.id, 1)}
                      icon={faCirclePlus}
                      className="icon-button"
                    />
                  </p>

                 {/* fasta decimaler */}
                  <p>{(item.price * item.quantity).toFixed(2)} SEK</p>
                </div>
              </li>
            ))}
            <section className="total-price">
              <p>Totalt pris: {totalPrice} SEK</p>
              <button
              className="checkout-button"
              onClick={handleCheckout}>Betala
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;