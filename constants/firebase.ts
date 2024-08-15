// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1wTbnD13Idj8Q_h5C8IMiV_nMhycYPj8",
  authDomain: "crossdict-80c93.firebaseapp.com",
  projectId: "crossdict-80c93",
  storageBucket: "crossdict-80c93.appspot.com",
  messagingSenderId: "718887298459",
  appId: "1:718887298459:web:b2533040ec239fd4f7ed3e",
  databaseURL: "https://crossdict-80c93-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);