import React from 'react';
import AddItemForm from './AddItemForm.jsx';

function AddToys() {
  const handleAddItem = (itemData) => {
    console.log('New item added:', itemData);
    // Add logic to save the item to the database or state
  };

  return (
    <div className='add'>
      <h2>Lägg till ny produkt</h2>
      <AddItemForm onSubmit={handleAddItem} />
    </div>
  );
}

export default AddToys;