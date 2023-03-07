// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuFfiJddC_JeBtb04RYymb_LVgm5QaC3g",
  authDomain: "catalogo-ss.firebaseapp.com",
  projectId: "catalogo-ss",
  storageBucket: "catalogo-ss.appspot.com",
  messagingSenderId: "631213164950",
  appId: "1:631213164950:web:749652b399e8ceb1aeb5b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db, app};