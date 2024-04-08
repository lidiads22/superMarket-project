// cart.JS
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




document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('discountPopup').classList.add('show');
  }, 2000); // Show popup after 2 seconds for demonstration
});

function closePopup() {
  document.getElementById('discountPopup').classList.remove('show');
}


function handleAddToCartClick(event, uid) {
    // Prevent the default form submission if it's within a form
    event.preventDefault();

    // Get the item ID from the clicked button's data attribute
    const itemID = event.target.getAttribute('data-itemid');
    const itemDetails = products[itemID];

    // Reference to the user's cart for the item
    const userCartRef = db.collection("users").doc(uid).collection("cart").doc(itemID);

    // Set the item in the user's cart
    userCartRef.set(itemDetails)
        .then(() => {
            console.log("Item added to cart successfully");
            // After adding item to cart, update the cart display
            displayCart(uid);
        })
        .catch(error => console.error("Error adding item to cart: ", error));
}

function displayCart(uid) {
    const cartRef = db.collection("users").doc(uid).collection("cart");
    const listCartElement = document.querySelector('.ListCart'); // Make sure this matches your container's class
  
    cartRef.get()
      .then(querySnapshot => {
        listCartElement.innerHTML = ''; // Clear any existing cart items
        querySnapshot.forEach(doc => {
          const item = doc.data();
          const itemElement = document.createElement('div');
          itemElement.classList.add('item'); // Make sure this class is styled in your CSS
          itemElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${item.imageUrl}" alt="${item.name}" style="width: 70px; height: auto;">
              <div>
                <div>${item.name}</div>
                <div class="price">$${item.price}</div>
                <div>Quantity: ${item.quantity}</div>
              </div>
            </div>
            <button onclick="removeItemFromCart('${doc.id}', '${uid}')">Remove</button>
          `;
          listCartElement.appendChild(itemElement);
        });
      })
      .catch(error => console.error("Error fetching cart items: ", error));
  }
  

function attachEventListeners() {
    const addToCartButtons = document.querySelectorAll('.btn-outline-dark.mt-auto');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Check if the user is signed in
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    handleAddToCartClick(event, user.uid);
                } else {
                    console.log("User is not signed in.");
                }
            });
        });
    });
}

function removeItemFromCart(itemId, uid) {
    // Reference to the user's cart for the item
    const userCartRef = db.collection("users").doc(uid).collection("cart").doc(itemId);

    // Delete the item from the user's cart
    userCartRef.delete()
        .then(() => {
            console.log("Item removed from cart successfully");
            // After removing item from cart, update the cart display
            displayCart(uid);
        })
        .catch(error => console.error("Error removing item from cart: ", error));
}


// Call attachEventListeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    attachEventListeners();
});
