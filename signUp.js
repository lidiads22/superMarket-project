    // ClIENT-SIDE javascript
    // listen for submit
    // Firebase initialization code
    // check the email is valid, using regular expression
    //import firebase from "firebase/compat/app";
    // Assuming Firebase has been initialized in another file




    function isEmailValid(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }


    // Checks if password is secure using regex
    const isPasswordSecure = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        return re.test(password);
    };

    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded');
        const form = document.getElementById('signup-form');
        if (form) {
            form.addEventListener('submit', async event => {
                event.preventDefault();

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if(isEmailValid(email) && isPasswordSecure(password)) {
                    try {
                        await db.collection("users").doc(email).set({
                            email: email,
                            password: password, // Reminder: Store passwords securely
                        });
                        console.log("User added successfully");
                        // Actions on successful submission (e.g., redirect, show success message)
                    } catch (error) {
                        console.error("Error adding user: ", error);
                        // Handle the error (show error message)
                    }
                } else {
                    console.log("Validation failed", password);
                    // Handle validation failure (show validation error)

                }
            });
        } else {
            console.log('signup-form not found');
        }
    });
