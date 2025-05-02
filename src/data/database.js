// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8abj82nQAQtDlRBlwF0jNyxQ4oDSjuU4",
  authDomain: "webbshop-project.firebaseapp.com",
  projectId: "webbshop-project",
  storageBucket: "webbshop-project.firebasestorage.app",
  messagingSenderId: "89240485406",
  appId: "1:89240485406:web:48eab0277116f86d6bf80f",
  measurementId: "G-G3H51TLL8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};