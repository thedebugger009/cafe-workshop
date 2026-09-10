import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIjQeeuk887AfG9zQnoqFZluB3gj9UsCs",
  authDomain: "cafe-workshop-ad40a.firebaseapp.com",
  projectId: "cafe-workshop-ad40a",
  storageBucket: "cafe-workshop-ad40a.firebasestorage.app",
  messagingSenderId: "946686408371",
  appId: "1:946686408371:web:c4f4fc42e6a4dbf1a3e2c6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;