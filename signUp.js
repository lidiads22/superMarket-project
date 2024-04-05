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

   // CLIENT-SIDE JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (isEmailValid(email) && isPasswordSecure(password)) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // User creation successful
                    const user = userCredential.user;
                    console.log("User added successfully:", user.uid); // user.uid is the unique ID for the user.

                    // Optionally, initialize user-related data here, such as an empty cart
                    db.collection("users").doc(user.uid).collection("cart").doc("cartId").set({
                        cartItems: [],
                        order: []
                    }).then(() => {
                        console.log("Cart initialized for new user.");
                        alert("Signup successful!");
                        window.location.href = 'home.html'; // Redirect to home page or dashboard
                    }).catch((error) => {
                        console.error("Error initializing cart for user:", error);
                    });
                })
                .catch((error) => {
                    // Handle Errors here, such as email already in use
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error adding user:", errorCode, errorMessage);
                    // Display the error message to your user, adjust based on your UI
                    alert(errorMessage);
                });
            } else {
                console.log("Validation failed for email or password.");
                // Inform the user that validation failed
            }
        });
    } else {
        console.log('signup-form not found');
    }
});

// Adding items to Cart
function addItemToCart(uid, item) {
    const cartItemRef = db.collection('users').doc(uid).collection('cart').doc(item.itemId);

    cartItemRef.set({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
    })
    .then(() => console.log("Item added to cart successfully"))
    .catch((error) => console.error("Error adding item to cart: ", error));
}

// Displaying the Cart
function displayCart(uid) {
    const cartRef = db.collection('users').doc(uid).collection('cart');
    
    cartRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            // Dynamically create HTML for each item
            // Example:
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.name}" />
                    <p>Produce: ${item.name}</p>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
            document.getElementById('cartItemsContainer').appendChild(itemElement);
        });
    })
    .catch((error) => console.error("Error getting cart items: ", error));
}
