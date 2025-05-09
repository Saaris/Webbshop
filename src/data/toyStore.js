import { create } from 'zustand';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './database'; 

const useToyStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => {
  set({ isLoggedIn: status });
  if (!status) {
    console.log("Admin is not logged in");
  }
},
  
  cart: [],
  toyList: [],
  toyCount: 0, 
  totalprice: 0,

  isEditing: false,
  editToy: null,
  setIsEditing: (status) => set({ isEditing: status }),
  setEditToy: (toy) => set({ editToy: toy }),

  setToys: (t) => set((state) => ({
    toyList: t,
  })),

  addToCart: (toy) =>
    set((state) => {
      const alreadyInCart = state.cart.some((item) => item.id === toy.id);
      let newCart;
      if (alreadyInCart) {
        newCart = state.cart.map((item) =>
          item.id === toy.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...toy, price: parseFloat(toy.price), quantity: 1 }];
      }
  
      const newTotalPrice = newCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      return {
        cart: newCart,
        toyCount: state.toyCount + 1,
        totalPrice: newTotalPrice,
      };
    }),
     clearCart: () => set({ cart: [],toyCount: 0, totalPrice: 0 }),

     
  updateCartQuantity: (id, change) =>
    set((state) => {
      const newCart = state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0);
  
      const newTotalPrice = newCart.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );

      const newToyCount = newCart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total toy count
  
      return {
        cart: newCart,
        totalPrice: newTotalPrice,
        toyCount: newToyCount, // Update toyCount
      };
    }),

  updateToy: (updatedToy) =>
    set((state) => ({
      toyList: state.toyList.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      ),
      isEditing: false,
      editToy: null,
    })),

  setEditing: (status) => set({ isEditing: status }),

  handleEditClick: (toy) =>
    set({
      isEditing: true,
      editToy: toy,
    }),

  handleSaveClick: async () => {
  set((state) => {
    const updatedToy = state.editToy; // Hämta den redigerade leksaken
    const toyId = updatedToy.id;

    // Uppdatera Firestore
    const toyDocRef = doc(db, 'toys', toyId);
    updateDoc(toyDocRef, updatedToy)
      .then(() => {
        console.log(`Toy with id ${toyId} successfully updated in Firestore`);
      })
      .catch((error) => {
        console.error('Error updating toy in Firestore:', error);
      });
       return {
      toyList: state.toyList.map((toy) =>
        toy.id === toyId ? updatedToy : toy
      ),
      isEditing: false,
      editToy: null,
    };
  });
},


  handleInputChange: (name, value) =>
    set((state) => ({
      editToy: {
        ...state.editToy,
        [name]: value,
      },
    })),

  toys: [],
  loading: false,
  error: null,

  fetchToys: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, 'toys'));
      const toys = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ toys, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addToy: async (newToy) => {
    try {
      const docRef = await addDoc(collection(db, 'toys'), newToy);
      set((state) => ({ toys: [...state.toys, { id: docRef.id, ...newToy }] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

   removeItem: async (id) => {
    try {
      // Remove the item from Firestore
      await deleteDoc(doc(db, 'toys', id));
      console.log(`Item with id ${id} removed from Firestore`);

      // Update the local state to reflect the change
      set((state) => ({
        toyList: state.toyList.filter((toy) => toy.id !== id),
      }));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },


}));



export { useToyStore };
