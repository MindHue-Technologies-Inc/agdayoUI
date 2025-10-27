// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMXa-hKQj5TSqIahN70hvIdOa-qJucS7g",
  authDomain: "agdayo-38d41.firebaseapp.com",
  projectId: "agdayo-38d41",
  storageBucket: "agdayo-38d41.firebasestorage.app",
  messagingSenderId: "164991962932",
  appId: "1:164991962932:web:890be063da0e3c21805f61",
  measurementId: "G-T3PFGTVJE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);