// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy3aN_FHK9Zf1e7R29jPo6sXkFlATjXHY",
  authDomain: "netflixgpt-b1193.firebaseapp.com",
  projectId: "netflixgpt-b1193",
  storageBucket: "netflixgpt-b1193.firebasestorage.app",
  messagingSenderId: "1010103869013",
  appId: "1:1010103869013:web:764acc732388ac648b3edc",
  measurementId: "G-1MNX46B4HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();