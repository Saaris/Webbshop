import { collection, getDocs } from "firebase/firestore";
import { db } from "./database";

async function getToys(setToys) {
	const toysCollection = collection(db, 'toys');
	const toysSnapshot = await getDocs(toysCollection);
	const toysList = toysSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	setToys(toysList);
	console.log('getToys', toysList)
}

export { getToys }