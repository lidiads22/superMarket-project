    // ClIENT-SIDE javascript
    // listen for submit
    // Firebase initialization code
    // check the email is valid, using regular expression
    import firebase from "firebase/compat/app";

    const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

    // Checks if password is secure using regex
    const isPasswordSecure = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return re.test(password);
};

    // Assuming Firebase has been initialized properly
    const db = firebase.firestore();
    const auth = firebase.auth(); // Initialize Firebase Authentication

    // Function to send message to Firebase
    function sendMessage(email, password) {
        // Add user data to Firestore
        db.collection("users").add({
            email: email,
            password: password
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                // Handle success, such as displaying a success message to the user
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                // Handle error, such as displaying an error message to the user
            });
    }
    // Function to sign up a new user with email and password using Firebase Authentication
    const signUpWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User signed up:', user.uid);
            // You can redirect the user to another page or show a success message
        } catch (error) {
            console.error('Sign-up error:', error.code, error.message);
            // Handle sign-up errors here, show error message to the user ??
        }
    };

    // Function to show error message
    function showError(input, message) {
        const formField = input.parentElement; // Get the parent form field
        formField.classList.remove('success');
        formField.classList.add('error');
        const errorMessage = formField.querySelector('.error-message');
        errorMessage.textContent = message;
    }

    // Event listener for the signup form
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get Values from the DOM
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;

        // Validate email
        if (!isEmailValid(email)) {
            showError(emailInput, 'Invalid email address');
            return;
        }

        // Validate password
        if (!isPasswordSecure(password)) {
            showError(passwordInput, 'Password is not secure');
            return;
        }

        // Sign up the user using Firebase Authentication
        signUpWithEmailAndPassword(email, password);

        // Send user data to Firebase Firestore
        sendMessage(email, password);

        // Show alert message
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after seven seconds
        setTimeout(function() {
            document.querySelector('.alert').style.display = 'none';
        }, 7000);

        // Reset the form
        this.reset();
    });