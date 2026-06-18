// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2ZAj5hu6oC2NbZ3oqLGLpLRxZcp5GwCs",
  authDomain: "training-initiative.firebaseapp.com",
  projectId: "training-initiative",
  storageBucket: "training-initiative.firebasestorage.app",
  messagingSenderId: "219800862770",
  appId: "1:219800862770:web:17fdd7026275ae1dd8fc2b",
  measurementId: "G-RYYLCW00YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);