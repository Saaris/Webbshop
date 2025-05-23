import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 


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

export { db };
