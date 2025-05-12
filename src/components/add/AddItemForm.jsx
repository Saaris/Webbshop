import React, { useState } from 'react';
import './AddItemForm.css';
import { validateSchema, inputValidation } from '../../data/validate';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../data/database';

function AddItemForm({ onSubmit, updateToyList }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const schema = validateSchema;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));

    setTouched((prevTouched) => ({
      ...prevTouched,
      [id]: true
    }));

    const { message } = inputValidation({ [id]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: message[id]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Button clicked: Lägg till');

    const { message, formIsValid } = inputValidation(formData);
    if (!formIsValid) {
      setErrors(message);
      return;
    }

    setErrors({});

    try {
      // lägga till ny leksak i Firestore
      await addDoc(collection(db, 'toys'), formData);
      console.log('New toy added to Firestore:', formData);

      // uppdatera lokal leksaklista
      if (updateToyList) {
        updateToyList(formData);
      }

      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding toy to Firestore:', error);
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
    
      <div className="form-group">
        <p className="name-input">Namn</p>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Namn på produkt'
          className='inputs'/>

        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
      <p className="name-input">Kategori</p>
        <input
          type="text"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className='inputs' />

        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div className="form-group">
      <p className="name-input">Beskrivning</p>
        <input
          id="description"
          value={formData.description}
          onChange={handleChange}
          className='inputs'>
        </input>

        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group">
      <p className="name-input">Pris</p>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="price-input"/>

        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div className="form-group">
      <p className="name-input">Bild url</p>
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={handleChange}
          className='inputs'
          placeholder='https://example.com/image.jpg'/>

        {errors.image && <span className="error">{errors.image}</span>}
      </div>

      <button 
      onClick={handleSubmit}
      className='add-new-item'>Lägg till
      </button>
    </form>
  );
}
export default AddItemForm;