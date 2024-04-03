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


async function displayCart(userEmail) {
    const db = firebase.firestore();
    const userCartDocRef = db.collection("users").doc(userEmail).collection("cart").doc("cartId");

    try {
        const doc = await userCartDocRef.get();
        if (doc.exists) {
            const cartItems = doc.data().cartItems || [];
            const cartItemListElement = document.getElementById('cartItemList');
            cartItemListElement.innerHTML = ''; // Clear current list
            let total = 0;

            cartItems.forEach(item => {
                // For each item, append details to cartItemListElement. Assumes you have item details like name and price.
                const itemElement = document.createElement('div');
                itemElement.textContent = `Item: ${item.itemID}, Quantity: ${item.quantity}`;
                cartItemListElement.appendChild(itemElement);

                // Update total - assuming you have a way to get the price of each item
                total += (item.quantity * getPriceById(item.itemID)); // Implement this function based on your application
            });

            document.getElementById('cartTotal').textContent = total.toFixed(2);
        } else {
            console.log("No cart found for user.");
        }
    } catch (error) {
        console.error("Error fetching cart: ", error);
    }
}
addItemToCart(userEmail, itemID, quantity).then(() => {
    console.log("Item added to cart");
    // Update the cart display
    displayCart(userEmail);
}).catch(error => {
    console.error("Could not add item to cart", error);
    // Handle the error appropriately
});


  document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('cartToggle').addEventListener('click', function() {
          const cartSidebar = document.getElementById('cartSidebar');
          if (cartSidebar) {
              cartSidebar.classList.toggle('open');
          } else {
              console.error('Cart sidebar element not found!');
          }
      });
  });