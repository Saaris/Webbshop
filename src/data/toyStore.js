import { create } from 'zustand'

const useToyStore = create((set) => ({
	toyList: [],

	setToys: t => set(state => ({
		toyList: t
	}))

}))

export { useToyStore }