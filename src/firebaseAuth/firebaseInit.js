// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3_PwFIxDEOI_8lqdSwX5UNhas2s-myeM",
  authDomain: "coffee-auth-9f7ae.firebaseapp.com",
  projectId: "coffee-auth-9f7ae",
  storageBucket: "coffee-auth-9f7ae.firebasestorage.app",
  messagingSenderId: "624487628317",
  appId: "1:624487628317:web:0e343ae9dd8004e2a310f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};