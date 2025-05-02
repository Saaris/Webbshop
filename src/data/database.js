// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Don't forget to import getFirestore for your database!
import { getFirestore } from "firebase/firestore"; // <-- Add this line
// You can also import getAnalytics if you plan to use it later
// import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8abj82nQAQtDlRBlwF0jNyxQ4oDSjuU4",
  authDomain: "webbshop-project.firebaseapp.com",
  projectId: "webbshop-project",
  storageBucket: "webbshop-project.firebasestorage.app",
  messagingSenderId: "89240485406",
  appId: "1:89240485406:web:48eab0277116f86d6bf80f",
  measurementId: "G-G3H51TLL8B" // Optional field for Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Analytics if you uncommented it
// const analytics = getAnalytics(app);

// Export db so your importToys.js can use it
export { db };
