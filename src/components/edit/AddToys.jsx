import { useEffect, useState } from 'react';
import AddItemForm from './AddItemForm.jsx';
import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../data/database';
import './AddItemForm.css';

function AddToys() {
  const [toys, setToys] = useState([]);

  const [showMessage, setShowMessage] = useState(false);

  //useEffect- hämta leksaker från Firestore från collect. toys
  useEffect(() => {
    const fetchToys = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'toys'));
        const toysData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setToys(toysData);
      } catch (error) {
        console.error('Error fetching toys:', error);
      }
    };

    fetchToys();
  }, []);

  const handleAddItem = (itemData) => {
  // Konvertera priset till ett nummer
  const itemWithNumberPrice = {
    ...itemData,
    price: Number(itemData.price), // Konvertera priset till ett nummer
  };

  console.log('New item added:', itemWithNumberPrice);

  // Uppdatera state med den nya produkten
  setToys((prevToys) => [...prevToys, itemWithNumberPrice]);

  // Om du sparar till Firestore, lägg till här
  // addDoc(collection(db, 'toys'), itemWithNumberPrice);
  setShowMessage(true);
  setTimeout(() => setShowMessage(false), 2000);
};

  return (
    <div className='add'>
      <h2>Lägg till ny produkt</h2>
      <div className="hover-tooltip">
      <NavLink to="/toys"> 
        <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
        <span className="tooltip-text">Tillbaka</span>
        </div>
         {showMessage && (
      <p className="confirmation-message animate-pop">Ny produkt har lagts till!</p>
    )}
      <AddItemForm onSubmit={handleAddItem} />
    </div>
  );
}

export default AddToys;