import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdk93WmFxcFiuUjbO5rRdii7ABD0nwqNs",
  authDomain: "smart-travel-95898.firebaseapp.com",
  projectId: "smart-travel-95898",
  storageBucket: "smart-travel-95898.firebasestorage.app",
  messagingSenderId: "130483884307",
  appId: "1:130483884307:web:c0b770e0913b6f97a28ae6",
  measurementId: "G-WPW75BKFD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
