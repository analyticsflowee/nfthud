import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBasPfo_YzWHHhPwZvBPAqgVcDvE8jK2ec",
  authDomain: "nfthud-v2.firebaseapp.com",
  databaseURL: "https://nfthud-v2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nfthud-v2",
  storageBucket: "nfthud-v2.appspot.com",
  messagingSenderId: "828703988497",
  appId: "1:828703988497:web:7f0b88225ea478400a0ab0",
  measurementId: "G-KJBEXERKL7"
};
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getDatabase(app);

export default db;
