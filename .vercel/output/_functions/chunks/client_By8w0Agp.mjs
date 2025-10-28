import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMXa-hKQj5TSqIahN70hvIdOa-qJucS7g",
  authDomain: "agdayo-38d41.firebaseapp.com",
  projectId: "agdayo-38d41",
  storageBucket: "agdayo-38d41.firebasestorage.app",
  messagingSenderId: "164991962932",
  appId: "1:164991962932:web:890be063da0e3c21805f61",
  measurementId: "G-T3PFGTVJE7"
};
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
getFirestore(app);

export { auth };
