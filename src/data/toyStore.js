import { create } from 'zustand';

const useToyStore = create((set) => ({
  cart: [],
  toyList: [],
  toyCount: 0, 

  setToys: (t) => set((state) => ({
    toyList: t,
  })),

  addToCart: (toy) =>
    set((state) => {
      const alreadyInCart = state.cart.some((item) => item.id === toy.id);
      if (alreadyInCart) {
        return {
          cart: state.cart.map((item) =>
            item.id === toy.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          toyCount: state.toyCount + 1,
        };
      }
      return {
        cart: [...state.cart, { ...toy, quantity: 1 }],
        toyCount: state.toyCount + 1, 
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
      const newToyCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
      return {
        cart: newCart,
        toyCount: newToyCount, 
      };
    }),
}));

export { useToyStore };

