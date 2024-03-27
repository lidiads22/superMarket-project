// cart.js
window.addItemToCart = async function(userEmail, itemID, quantity) {
    const db = firebase.firestore(); // Access Firestore
    const userCartDocRef = db.collection("users").doc(userEmail).collection("cart").doc("cartId");

    // Prepare the item object
    const item = { itemID, quantity };

    try {
        // Use a transaction to add/update the item in the cartItems array
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(userCartDocRef);
            if (!doc.exists) {
                console.error("Document does not exist!");
                throw new Error("Document does not exist!");
            }

            const cartItems = doc.data().cartItems || [];
            const existingItemIndex = cartItems.findIndex(ci => ci.itemID === itemID);

            if (existingItemIndex !== -1) {
                // Item exists, update quantity
                cartItems[existingItemIndex].quantity += quantity;
            } else {
                // New item, add to cart
                cartItems.push(item);
            }

            // Update the cart document with the new cartItems array
            transaction.update(userCartDocRef, { cartItems });
        });

        console.log("Item added to cart successfully");
    } catch (error) {
        console.error("Error adding item to cart: ", error);
    }
};

// Assume getCurrentUserEmail is defined somewhere in your project
// This function retrieves the current user's email from Firebase Auth
function getCurrentUserEmail() {
    const user = firebase.auth().currentUser;
    return user ? user.email : null;
}

function handleAddToCartClick(event) {
    const button = event.target;
    const itemID = button.getAttribute('data-itemid');
    const quantity = parseInt(button.getAttribute('data-quantity'), 10);
    const userEmail = getCurrentUserEmail();

    if (!userEmail) {
        alert("Please log in to add items to your cart.");
        return;
    }

    addItemToCart(userEmail, itemID, quantity).then(() => {
        console.log("Item added to cart");
        // Optionally, give feedback to the user (like updating a cart icon count)
    }).catch(error => {
        console.error("Could not add item to cart", error);
        // Handle the error appropriately
    });
}
