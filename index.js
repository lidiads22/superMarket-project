//server-side script using the Express.js framework for Node.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// firebase
// Instead of using require, use ES6 import statements
// const firebase = require('firebase');
//to use firebase app
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase using your config
const firebaseConfig = {
    apiKey: "AIzaSyDMWilTOAj6n_lrzlRbsroLesgG_ZtbS-8",
    authDomain: "onlinesupermarket-7c84a.firebaseapp.com",
    projectId: "onlinesupermarket-7c84a",
    storageBucket: "onlinesupermarket-7c84a.appspot.com",
    messagingSenderId: "463404516501",
    appId: "1:463404516501:web:b38d810059e9a98c16479c",
    measurementId: "G-31RH674TLG"
};
firebase.initializeApp(firebaseConfig);

//var rootRef = firebase.database().ref();

// Reference to Firebase auth
const auth = firebase.auth();

//   let formMessage = firebase.database().ref('register');


//const express = require('express');
//const path = require('path');
const app = express();
const port = 8000;

// Serve static files from the "public" folder
//app.use(express.static('public'));
// Serve static files from the root directory
app.use(express.static(__dirname));


// Serve static files from the "js" folder
app.use('/js', express.static('js'));

// Serve static files from the "css" folder
app.use('/css', express.static('css'));

// Serve index.html
app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Serve login.html
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Firestore database reference
//const db = firebase.firestore();
// Serve signUp.html
app.get('/signUp.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signUp.html'));
});

// Serve cart.html
app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cart.html'));
});

// Serve static files from the "assets" folder for pictures
app.use('/assets', express.static('assets'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
