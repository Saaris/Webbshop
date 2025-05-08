import { create } from 'zustand';

const useToyStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  
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
  
      return {
        cart: newCart,
        totalPrice: newTotalPrice,
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

  handleSaveClick: () =>
    set((state) => ({
      toyList: state.toyList.map((toy) =>
        toy.id === state.editToy.id ? state.editToy : toy
      ),
      isEditing: false,
      editToy: null,
    })),

  handleInputChange: (name, value) =>
    set((state) => ({
      editToy: {
        ...state.editToy,
        [name]: value,
      },
    })),
}));

export { useToyStore };
