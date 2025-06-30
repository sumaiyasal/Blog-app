// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blog-app-edbf9.firebaseapp.com",
  projectId: "blog-app-edbf9",
  storageBucket: "blog-app-edbf9.firebasestorage.app",
  messagingSenderId: "592258508334",
  appId: "1:592258508334:web:7f3ab026a283943f3de1bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);