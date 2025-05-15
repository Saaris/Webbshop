import { useState } from 'react';
import './AddItemForm.css';
import { validateSchema, inputValidation } from '../../data/validate';
import { useToyStore } from '../../data/toyStore.js';


// lagrar formulärets nnehåll
function AddItemForm({ onSubmit }) {
  const addToy = useToyStore((state) => state.addToy)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // validerar formuläret
  const schema = validateSchema;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));

    // validerar fältet när det ändras
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

    const { message, formIsValid } = inputValidation(formData);
    if (!formIsValid) {
      setErrors(message);
      return;
    }

    setErrors({});

    const newToy = {
      ...formData,
      price: Number(formData.price),
    };

    try {
     
      await addToy(newToy);
      console.log('Ny leksak har lagts till:', newToy);

      // Skicka produktdata till AddToys
      if (onSubmit) {
        onSubmit(newToy); // Skicka det nya objektet, inte det tömda!
      }

      // Återställ formuläret 
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        image: '',
      });
    } catch (error) {
      console.error('Error när du lägger till ny leksak:', error);
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
      className='add-new-item'>Lägg till
      </button>
    </form>
  );
}
export default AddItemForm;