import { create } from 'zustand'

const useToyStore = create((set) => ({
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
  

}))



export { useToyStore }