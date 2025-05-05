import { create } from 'zustand'

const useToyStore = create((set) => ({
	cart: [],

	toyList: [],

	setToys: t => set(state => ({
		toyList: t
	})),

	toyCount: 0,

 	increaseToy: () => set(state => ({
    toyCount: state.toyCount + 1

	})),

  	decreaseToy: () => set(state => ({
	toyCount: Math.max(0, state.toyCount - 1),

	})),
	addToCart: (toy) => set((state => {
		const alreadyInCart = state.cart.some((item) => item.id === toy.id);
		if (alreadyInCart) return state;
		return {
		  cart: [...state.cart, toy],
		};
		
		
	  })),
	
}))



export { useToyStore }

