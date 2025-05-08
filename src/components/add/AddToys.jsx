import React, { useEffect, useState } from 'react';
import AddItemForm from './AddItemForm.jsx';
import { validateSchema } from '../../data/validate.js';
import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../data/database';
import './AddItemForm.css';

function AddToys() {
  const [toys, setToys] = useState([]);

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
    console.log('New item added:', itemData);
    setToys((prevToys) => [...prevToys, itemData]);
  };

  return (
    <div className='add'>
      <NavLink to="/toys"> 
        <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
      <AddItemForm onSubmit={handleAddItem} />
      <h2>Lägg till ny produkt</h2>

    </div>
  );
}

export default AddToys;