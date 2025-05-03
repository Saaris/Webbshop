// Import the functions you need from the SDKs
// (You'll add these imports at the top of your file after setting up Step 4)
import { collection, addDoc } from "firebase/firestore";
import { db } from "./database.js"; // Looks one folder up (..) for the file named datase.js
 

const toyList = [
    {
        id: 1,
        name: "Uppblåsbar Flamingo",
        description: "Stor uppblåsbar flamingo för pool eller strand.",
        price: "299 kr",
        image: "https://www.coolstuff.se/produkter/uppblasbar-flamingo.jpg"
    },
    {
        id: 2,
        name: "Lekset för Barn",
        description: "17-delars set med hink, spadar och formar för sandlek.",
        price: "159 kr",
        image: "https://www.coolstuff.se/produkter/sandset-barn.jpg"
    },
    {
        id: 3,
        name: "Vattenpistol Nerf Super Soaker",
        description: "Kraftfull vattenpistol med bra räckvidd.",
        price: "91 kr",
        image: "https://www.coolstuff.se/produkter/nerf-super-soaker.jpg"
    },
    {
        id: 4,
        name: "Mumin Badboll",
        description: "50 cm uppblåsbar boll med Muminmotiv.",
        price: "75 kr",
        image: "https://www.coolstuff.se/produkter/mumin-badboll.jpg"
    },
    {
        id: 5,
        name: "Bestway Vattenrutschkana",
        description: "Lång vattenrutschkana för trädgården.",
        price: "249 kr",
        image: "https://www.coolstuff.se/produkter/bestway-vattenrutschkana.jpg"
    },
    {
        id: 6,
        name: "Elektrisk Vattenpistol",
        description: "Automatisk vattenpistol för intensiv vattenlek.",
        price: "595 kr",
        image: "https://www.coolstuff.se/produkter/elektrisk-vattenpistol.jpg"
    },
    {
        id: 7,
        name: "Lekstuga Sweety Corner",
        description: "Charmig lekstuga med glasskiosk-tema.",
        price: "3985 kr",
        image: "https://www.coolstuff.se/produkter/lekstuga-sweety-corner.jpg"
    },
    {
        id: 8,
        name: "Simmande Delfin",
        description: "Liten badleksak som simmar i vattnet.",
        price: "25 kr",
        image: "https://www.coolstuff.se/produkter/simmande-delfin.jpg"
    },
    {
        id: 9,
        name: "Regnbågsstrandboll",
        description: "Färgglad uppblåsbar boll för strand eller trädgård.",
        price: "132 kr",
        image: "https://www.coolstuff.se/produkter/regnbagsstrandboll.jpg"
    },
    {
        id: 10,
        name: "Scrunch Spade",
        description: "Flexibel och hopfällbar strandspade.",
        price: "21 kr",
        image: "https://www.coolstuff.se/produkter/scrunch-spade.jpg"
    },
    {
        id: 11,
        name: "Uppblåsbar Pool för Barn",
        description: "1,5 m uppblåsbar barnpool för trädgården.",
        price: "299 kr",
        image: "https://fyndiq.se/produkter/uppblasbar-barnpool.jpg"
    },
    {
        id: 12,
        name: "Vattenspridare för Barn",
        description: "Rolig vattenspridare i form av en val.",
        price: "275 kr",
        image: "https://www.coolstuff.se/produkter/vattenspridare-barn.jpg"
    },
    {
        id: 13,
        name: "Uppblåsbar Vattenhängmatta",
        description: "Flytande vattenhängmatta för avkoppling i poolen.",
        price: "150 kr",
        image: "https://fyndiq.se/produkter/uppblasbar-vattenhangmatta.jpg"
    },
    {
        id: 14,
        name: "Bestway Simflottör för Spädbarn",
        description: "Uppblåsbar simflottör för spädbarn med säte.",
        price: "125 kr",
        image: "https://www.coolstuff.se/produkter/bestway-simflottor.jpg"
    },
    {
        id: 15,
        name: "Uppblåsbar Flytring Donut",
        description: "Flytring i form av en färgglad donut.",
        price: "267 kr",
        image: "https://www.coolstuff.se/produkter/flytring-donut.jpg"
    },
    {
        id: 16,
        name: "Vattenpistol Water Animals",
        description: "Vattenpistol med djurmotiv i EVA-gummi.",
        price: "270 kr",
        image: "https://www.coolstuff.se/produkter/vattenpistol-water-animals.jpg"
    },
    {
        id: 17,
        name: "Bestway Uppblåsbar Familjepool",
        description: "Stor familjepool med plats för flera barn.",
        price: "848 kr",
        image: "https://www.coolstuff.se/produkter/bestway-familjepool.jpg"
    },
    {
        id: 18,
        name: "Badleksak - Pop-up Nallebjörn",
        description: "Söt badleksak i form av en nallebjörn.",
        price: "361 kr",
        image: "https://www.coolstuff.se/produkter/popup-nallebjorn.jpg"
    },
    {
        id: 19,
        name: "Uppblåsbar Flytring Stitch",
        description: "Flytring med motiv av Stitch från Disney.",
        price: "299 kr",
        image: "https://www.coolstuff.se/produkter/flytring-stitch.jpg"
    },
    {
        id: 20,
        name: "Uppblåsbar Boll Nalle Puh",
        description: "51 cm uppblåsbar boll med Nalle Puh-motiv.",
        price: "272 kr",
        image: "https://www.coolstuff.se/produkter/nalle-puh-boll.jpg"
    },
    {
        id: 21,
        name: "Vattenpistol Multicolour",
        description: "Färgglad vattenpistol för sommarlekar.",
        price: "210 kr",
        image: "https://www.coolstuff.se/produkter/vattenpistol-multicolour.jpg"
    },
    {
        id: 22,
        name: "Bestway Uppblåsbar Rymdfarkost",
        description: "Uppblåsbar rymdfarkost med vattenpistol.",
        price: "399 kr",
        image: "https://www.coolstuff.se/produkter/bestway-rymdfarkost.jpg"
    }
];

// Function to add the toys to Firestore
const toysCollectionRef = collection(db, "toys"); 
async function addToysToFirestore() {

    toyList.forEach(async toy => {
  try {
    // Lägg till leksaker som ett nytt dokument i 'toys'-collection
			const docRef = await addDoc(toysCollectionRef, toy);
			console.log(`Leksaker "${toy.name}" tillagt med ID: ${docRef.id}`);
		} catch (e) {
			console.error(`Fel vid import av leksaker "${toy.name}": `, e);
		}
	})

	console.log("Import klar!");
}

// Call the function to run the import
//addToysToFirestore(); // You would call this function when you want to trigger the import
