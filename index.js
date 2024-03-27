//server

const express = require("express");
const cors = require("cors");
const user = require("./config");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000


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