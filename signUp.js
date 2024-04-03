    // ClIENT-SIDE javascript
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
        const form = document.getElementById('signup-form');
        if (form) {
            form.addEventListener('submit', async event => {
                event.preventDefault();
    
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
    
                if (isEmailValid(email) && isPasswordSecure(password)) {
                    try {
                        // Create the user account
                        await db.collection("users").doc(email).set({
                            email: email,
                            password: password, // Reminder: Storing passwords in plaintext is insecure, consider using authentication mechanisms
                        });
                        console.log("User added successfully");
    
                        // Initialize user-related data (e.g., an empty cart) here if necessary
                        // Example: Creating an empty cart for the user
                        await db.collection("users").doc(email).collection("cart").doc("cartId").set({
                            cartItems: [],
                            order: []
                        });
    
                        alert("Signup successful!");
                        window.location.href = 'home.html';
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