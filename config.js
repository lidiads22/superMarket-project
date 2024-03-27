//const firebase = require("firebase");
// Import firebase using CommonJS imports
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDMWilTOAj6n_lrzlRbsroLesgG_ZtbS-8",
    authDomain: "onlinesupermarket-7c84a.firebaseapp.com",
    projectId: "onlinesupermarket-7c84a",
    storageBucket: "onlinesupermarket-7c84a.appspot.com",
    messagingSenderId: "463404516501",
    appId: "1:463404516501:web:b38d810059e9a98c16479c",
    measurementId: "G-31RH674TLG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = firebase.firestore();

// Reference to the "users" collection
const users = db.collection("users");

// Export the users collection
module.exports = { users };