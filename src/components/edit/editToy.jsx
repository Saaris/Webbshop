import { useToyStore } from '../../data/toyStore.js';
import { useEffect, useState } from 'react';
import { inputValidation } from '../../data/validate.js';

const EditToy = () => {
  const { editToy, handleInputChange, handleSaveClick } = useToyStore();

  const [errors, setErrors] = useState({});

    useEffect(() => {
    if (editToy) {
      const { message } = inputValidation(editToy);
      setErrors(message);
    }
  }, [editToy]);
  console.log('Current editToy:', editToy);

  if (!editToy) {
    return <p>Ingen leksak vald för redigering.</p>;
  }

   return (
    <div className="edit-toy-form">
      <div className="form-group-edit">
        <input
          type="text"
          name="name"
          value={editToy.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Namn"
          className="edit-input"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group-edit">
        <input
          type="text"
          name="description"
          value={editToy.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Beskrivning"
          className="edit-input"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-group-edit">
        <input
          type="number"
          // name="price"
          value={editToy.price || ''}
          onChange={(e) => handleInputChange('price', e.target.value)}
          placeholder="Pris"
          className="edit-price-input"
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div className="form-group-edit">
        <input
          type="text"
          name="image"
          value={editToy.image || ''}
          onChange={(e) => handleInputChange('image', e.target.value)}
          placeholder='https://example.com/image.jpg'
          className="edit-img-input"
        />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>

      <button 
  className='save-button'
  onClick={() => {
    console.log('Save button clicked'); // Kontrollera om knappen klickas
    console.log('Current editToy:', editToy); // Kontrollera datan i editToy
    const { formIsValid, message } = inputValidation(editToy);
    console.log('Validation Result:', { formIsValid, message }); // Kontrollera valideringsresultatet
    setErrors(message);
    if (formIsValid) {
      console.log('Form is valid, calling handleSaveClick'); // Kontrollera om valideringen lyckas
      handleSaveClick();
    }
  }}
>
  Spara
</button>
    </div>
  );
};

export default EditToy;
