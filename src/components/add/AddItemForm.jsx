import React, { useState } from 'react';
import Joi from 'joi';
import './AddItemForm.css';
import { validateSchema, inputValidation } from '../../data/validate';

function AddItemForm({ onSubmit }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const { message, formIsValid } = inputValidation(formData);
    if (!formIsValid) {
      setErrors(message);
      return;
    }

    setErrors({});
    onSubmit(formData);
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      image: ''
    });
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
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
      <p className="name-input">Kategori</p>
        <input
          type="text"
          id="category"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div className="form-group">
      <p className="name-input">Beskrivning</p>
        <input
          id="description"
          value={formData.description}
          onChange={handleChange}
        ></input>
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <div className="form-group">
      <p className="name-input">Pris</p>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>
      <div className="form-group">
      <p className="name-input">Bild url</p>
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>
      <button 
      className='add-new-item'
      type="submit">Lägg till</button>
    </form>
  );

}
export default AddItemForm;