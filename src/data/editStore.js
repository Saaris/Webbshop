import { create } from 'zustand';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './database';

export const useEditStore = create((set, get) => ({
  handleSaveClick: async (editToy, onSuccess) => {
    try {
      const toyRef = doc(db, 'toys', editToy.id);
      const updatedToy = {
        name: editToy.name,
        category: editToy.category,
        description: editToy.description,
        price: Number(editToy.price),
        image: editToy.image
      };

      await updateDoc(toyRef, updatedToy);
      console.log('Leksak uppdaterad:', updatedToy);

      if (onSuccess) {
        onSuccess({ ...updatedToy, id: editToy.id });
      }
    } catch (error) {
      console.error('Fel vid uppdatering av leksak:', error);
    }
  }
}));


