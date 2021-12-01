// Import the functions you need from the SDKs you need
//reactifyestore@gmail.com
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
// import firebase from "firebase";
// import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBzserQfkKIQVYLINw_WhOojpkq9-sMlcA",
    authDomain: "reactify-e-store.firebaseapp.com",
    projectId: "reactify-e-store",
    storageBucket: "reactify-e-store.appspot.com",
    messagingSenderId: "655784018429",
    appId: "1:655784018429:web:13686deb05f504713d9994",
    measurementId: "G-1XHCFQ2D5H"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const auth = firebase.auth();

export {db, auth};
  