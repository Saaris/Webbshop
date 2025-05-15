import { useToyStore } from '../../data/toyStore.js';
import { useEditStore } from '../../data/editStore.js';
import { useEffect, useState } from 'react';
import { inputValidation } from '../../data/validate.js';

const EditToy = () => {
  const { editToy, handleInputChange, updateToy } = useToyStore();
  const { handleSaveClick } = useEditStore();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editToy) {
      const { message } = inputValidation(editToy);
      setErrors(message);
    }
  }, [editToy]);

  if (!editToy) return <p>Ingen leksak vald för redigering.</p>;

  return (
    <>
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
          name="category"
          value={editToy.category || ''}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="edit-input"
        />
        {errors.category && <span className="error">{errors.category}</span>}
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
          placeholder="https://example.com/image.jpg"
          className="edit-img-input"
        />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>

      <button 
        className="save-button"
        onClick={() => {
          const { formIsValid, message } = inputValidation(editToy);
          setErrors(message);

          if (formIsValid) {
            handleSaveClick(editToy, (updatedToy) => {
              updateToy(updatedToy);
            });
          }
        }}
      >
        Spara
      </button>
    </>
  );
};

export default EditToy;
