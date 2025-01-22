import { initializeApp } from "firebase/app";
import {
  getAuth,
  EmailAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAuRQG2f1Sq8HkdFia5hMovED2KiuwHmIw",
  authDomain: "st-markos-b86ed.firebaseapp.com",
  projectId: "st-markos-b86ed",
  storageBucket: "st-markos-b86ed.firebasestorage.app",
  messagingSenderId: "719790684623",
  appId: "1:719790684623:web:982e1c0b5082d6f0ad7aba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const EmailauthProvider = new EmailAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set successfully.");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });
