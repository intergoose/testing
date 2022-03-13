// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsFiCSXCZus-HKSgCdYzz9ataSfjqbKj4",
  authDomain: "reactjs-expense-tracker.firebaseapp.com",
  projectId: "reactjs-expense-tracker",
  storageBucket: "reactjs-expense-tracker.appspot.com",
  messagingSenderId: "779530247633",
  appId: "1:779530247633:web:7af61cb4a845112c0854f0",
  measurementId: "G-FZWWE13VLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()