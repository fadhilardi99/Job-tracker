import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Ganti dengan config Firebase Anda
  apiKey: "AIzaSyASvfqMPHzH--H8pMJK5Q_NgihaHg-gAso",
  authDomain: "job-tracker-10a2a.firebaseapp.com",
  projectId: "job-tracker-10a2a",
  storageBucket: "job-tracker-10a2a.firebasestorage.app",
  messagingSenderId: "953804955552",
  appId: "1:953804955552:web:d5e9420f28c755bad18ec5",
  measurementId: "G-Z7R5FXLKTL",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
