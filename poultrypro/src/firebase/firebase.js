// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUjk0nWjBYZPKPocEK0iBienoT4gzj3M8",
  authDomain: "saritech-solutions-ltd.firebaseapp.com",
  projectId: "saritech-solutions-ltd",
  storageBucket: "saritech-solutions-ltd.firebasestorage.app",
  messagingSenderId: "141640058243",
  appId: "1:141640058243:web:a9124945da495f0081a2b6",
  measurementId: "G-57S5KTP3HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;