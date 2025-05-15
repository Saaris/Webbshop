import { create } from 'zustand';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './database'; 

const useToyStore = create((set) => ({
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false, // Hämta från localStorage
  setIsLoggedIn: (status) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(status)); // Spara till localStorage
    set({ isLoggedIn: status });
  },
  
  cart: [],
  toyList: [],
  toyCount: 0, 
  totalprice: 0,
  filteredToys: [],
  
  isEditing: false,
  editToy: null,
  setIsEditing: (status) => set({ isEditing: status }),
  setEditToy: (toy) => set({ editToy: toy }),
  
  setToys: (t) => set((state) => ({
    toyList: t,
  })),
  
  //lägg till i varukorg
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

const newToyCount = newCart.reduce((sum, item) => sum + item.quantity, 0); // total ToyCount

return {
  cart: newCart,
  totalPrice: newTotalPrice,
  toyCount: newToyCount, 
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


//redigera inputfält 
handleEditClick: (toy) =>
  set({
  isEditing: true,
  editToy: toy,
}),


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
    const toyWithNumberPrice = {
      ...newToy,
      price: Number(newToy.price), 
    };
     const docRef = await addDoc(collection(db, 'toys'), toyWithNumberPrice);
    set((state) => ({
      toys: [...state.toys, { id: docRef.id, ...toyWithNumberPrice }],
    }));
    console.log('New toy added:', toyWithNumberPrice);
  } catch (error) {
    set({ error: error.message });
  }
},

removeItem: async (id) => {
  try {
    // ta bort leksak från firestore
    await deleteDoc(doc(db, 'toys', id));
    console.log(`Leksak med id ${id} togs bort från Firestore`);
    
    // Uppdat lokal state
    set((state) => ({
      toyList: state.toyList.filter((toy) => toy.id !== id),
    }));
  } catch (error) {
    console.error('Error, kan ej ta bort item:', error);
  }
},

handleLogin: () => {
  setIsLoggedIn(true); 
  localStorage.setItem('isLoggedIn', JSON.stringify(true)); // Spara till localStorage
},

handleLogout: () => {
  localStorage.setItem('isLoggedIn', JSON.stringify(false)); // Uppdatera localStorage
  set({ isLoggedIn: false }); 
  console.log('Admin logged out');
},



}));



export { useToyStore };
