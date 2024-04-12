    // ClIENT-SIDE javascript
    function isEmailValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

    const isPasswordSecure = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return re.test(password);
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


// Function to log in a user
function loginUser(email, password) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)  // Or use NONE as needed
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user.uid);
            window.location.href = 'home.html';  // Redirect to home page after login
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            alert("Failed to sign in: " + error.message);
            // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        });
}

// Event listener for DOMContentLoaded to set up form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Assuming isEmailValid and isPasswordSecure are valid functions that check the inputs
            if (isEmailValid(email) && isPasswordSecure(password)) {
                loginUser(email, password);  // Call the loginUser function defined above
            } else {
                console.log("Validation failed for email or password.");
            }
        });
    } else {
        console.log('login-form not found');
    }
});

