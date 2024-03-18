//Feb 27
// Mongo has been added and node.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

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
