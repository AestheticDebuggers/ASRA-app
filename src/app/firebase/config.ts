// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbsgnyCJaV7C7gI8ClgA6rDIsaRquSyiM",
  authDomain: "asra-b1ac6.firebaseapp.com",
  projectId: "asra-b1ac6",
  storageBucket: "asra-b1ac6.appspot.com", // Fixed incorrect storage bucket
  messagingSenderId: "642496897883",
  appId: "1:642496897883:web:708e4dea3e4a2833fcf07e",
  measurementId: "G-WQW08HSDG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Initialize analytics only in the browser (prevents SSR issues in Next.js)
if (typeof window !== "undefined") {
  getAnalytics(app);
}
