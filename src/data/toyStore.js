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
	toyCount: state.toyCount - 1

	})),
	addToCart: (toy) => set(state => ({
		cart: [...state.cart, toy]
	  })),
}))



export { useToyStore }