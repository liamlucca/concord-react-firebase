// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuNN4lvqVdWF5x4IWklA1znXx1B3LfmZE",
  authDomain: "concord-chat-proyect.firebaseapp.com",
  projectId: "concord-chat-proyect",
  storageBucket: "concord-chat-proyect.appspot.com",
  messagingSenderId: "126739114944",
  appId: "1:126739114944:web:76c9b6284a90152c67f625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);