// cart.js
// Object containing product details

const products = {
    "broccoli_ID": {
        name: "Fresh Broccoli",
        price: 2.50,
        imageUrl: "assets/fresh-broccoli.jpg",
        quantity: 1 // Default quantity can be 1 to start, or dynamically adjusted
    },
    "tomatoes_ID": {
        name: "Tomatoes",
        price: 1.50,
        imageUrl: "assets/tomatoes.jpg",
        quantity: 1
    },
    // Add more products as needed
    "potato_ID": {
        name: "Potatoes",
        price: 2.50,
        imageUrl: "assets/potato-table.jpg",
        quantity: 1 // Default quantity can be 1 to start, or dynamically adjusted
    },
    "bellPep_ID": {
        name: "Bell Peppers",
        price: 1.50,
        imageUrl: "assets/peppers.jpg",
        quantity: 1
    },
    "strawberry_ID": {
        name: "Organic Strawberries",
        price: 2.50,
        imageUrl: "assets/strawberry.jpg",
        quantity: 1 // Default quantity can be 1 to start, or dynamically adjusted
    },
    "banana_ID": {
        name: "Organic Bannanas",
        price: 1.50,
        imageUrl: "assets/ban.jpg",
        quantity: 1
    },
    "oranges_ID": {
        name: "Oranges",
        price: 2.50,
        imageUrl: "assets/orange.jpg",
        quantity: 1 // Default quantity can be 1 to start, or dynamically adjusted
    },
    "grapes_ID": {
        name: "Grapes",
        price: 1.50,
        imageUrl: "assets/grapes.jpg",
        quantity: 1
    }
};

function handleAddToCartClick(event, uid) {
    const itemID = event.target.getAttribute('data-itemid');
    const itemDetails = products[itemID];
    // Correcting to use UID for Firestore document path
    const userCartRef = db.collection("users").doc(uid).collection("cart").doc(itemID);

    userCartRef.set(itemDetails)
        .then(() => console.log("Item added to cart successfully"))
        .catch(error => console.error("Error adding item to cart: ", error));
}

// Function to display cart items
document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, attach event listeners or perform actions
            const uid = user.uid;
            attachEventListeners(uid);
        } else {
            // User is not signed in, handle accordingly
            console.log("No user is signed in.");
        }
    });
});

function attachEventListeners(uid) {
    const addToCartButtons = document.querySelectorAll('.btn-outline-dark.mt-auto');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            handleAddToCartClick(event, uid);
        });
    });
}

function handleAddToCartClick(event, uid) {
    const itemID = event.target.getAttribute('data-itemid');
    const itemDetails = products[itemID];
    const userCartRef = db.collection("users").doc(uid).collection("cart").doc(itemID);

    userCartRef.set(itemDetails)
        .then(() => console.log("Item added to cart successfully"))
        .catch(error => console.error("Error adding item to cart: ", error));
}

async function displayCart(uid) {
    const cartRef = db.collection("users").doc(uid).collection("cart");
    const cartItemListElement = document.getElementById('cartItemsContainer'); // Ensure you have this container in your HTML

    try {
        const querySnapshot = await cartRef.get();
        cartItemListElement.innerHTML = ''; // Clear the cart items container
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.name}" style="width: 100px; height: 100px;" />
                    <h5>${item.name}</h5>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
            `;
            cartItemListElement.appendChild(itemElement); // Append the item element to the cart items container
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}


// close button 
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('closeID');
    const cartTab = document.querySelector('.cartTab');
    cartTab.style.display = 'none';

    closeButton.addEventListener('click', function() {
        // Directly modify the style to hide the cart
        cartTab.style.display = 'none';
    });

    // Assuming you have an "Open Cart" button with id="cartToggle"
    const openCartButton = document.getElementById('cartToggle');
    openCartButton.addEventListener('click', function() {
        // Directly modify the style to show the cart
        cartTab.style.display = 'block';
    });
});


