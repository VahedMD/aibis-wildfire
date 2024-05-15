// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANf09Lpx3fhTbpQIh9pIg_DK7lKKov2s8",
  authDomain: "aibis-wildfire-420916.firebaseapp.com",
  projectId: "aibis-wildfire-420916",
  storageBucket: "aibis-wildfire-420916.appspot.com",
  messagingSenderId: "924037409202",
  appId: "1:924037409202:web:f540b92aab9088da701cab",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
