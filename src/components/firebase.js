import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgK0M4MeknygxJCMkenYFaG8Fjd0c94vA",
  authDomain: "final-project-1-4255b.firebaseapp.com",
  projectId: "final-project-1-4255b",
  storageBucket: "final-project-1-4255b.appspot.com",
  messagingSenderId: "746055393398",
  appId: "1:746055393398:web:c9e9115447fe23255eff57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
