import { collection, getDocs } from "firebase/firestore";
import { db } from "./database";

async function getToys(setToys) {
	console.log('getToys received:', typeof setToys, setToys);
	const toysCollection = collection(db, 'toys');
	const toysSnapshot = await getDocs(toysCollection);
	const toyList = toysSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	setToys(toyList);
	console.log('getToys', toyList)
}

export { getToys }