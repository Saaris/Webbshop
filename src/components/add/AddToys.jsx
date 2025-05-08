import React from 'react';
import AddItemForm from './AddItemForm';

function AddToys() {
  const handleAddItem = (itemData) => {
    console.log('New item added:', itemData);
    // Add logic to save the item to the database or state
  };

  return (
    <div>
      <h1>Add New Toy</h1>
      <AddItemForm onSubmit={handleAddItem} />
    </div>
  );
}

export default AddToys;