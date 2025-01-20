// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALZ4mPsbucBli7uZod4rUHBuWZPfjX4RI",
  authDomain: "cloudchat-11588.firebaseapp.com",
  projectId: "cloudchat-11588",
  storageBucket: "cloudchat-11588.firebasestorage.app",
  messagingSenderId: "455870064718",
  appId: "1:455870064718:web:49717c2ab667efcdbd7b1f",
  measurementId: "G-T51RBYQ11C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);