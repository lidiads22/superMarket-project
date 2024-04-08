    // ClIENT-SIDE javascript
    function isEmailValid(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
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
                try {
                    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    const user = userCredential.user;
                    console.log("User added successfully:", user.uid);
                    await db.collection("users").doc(user.uid).collection("cart").doc("cartId").set({
                        cartItems: [],
                        order: []
                    });
                    console.log("Cart initialized for new user.");
                    alert("Signup successful!");
                    window.location.href = 'home.html'; // Redirect
                } catch (error) {
                    console.error("Error during signup or cart initialization:", error.code, error.message);
                    alert(error.message);
                }
            } else {
                console.log("Validation failed for email or password.");
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

