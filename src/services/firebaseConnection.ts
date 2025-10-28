
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvklKjBUpfmL9ChPdLnpDS9X6BRbZUMpI",
  authDomain: "cflinks-4d9bd.firebaseapp.com",
  projectId: "cflinks-4d9bd",
  storageBucket: "cflinks-4d9bd.firebasestorage.app",
  messagingSenderId: "466518865921",
  appId: "1:466518865921:web:30647bd16436ba91f22800"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);

export { auth, db };