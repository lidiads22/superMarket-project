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

// checkout Button
document.addEventListener('DOMContentLoaded', function() {
    var checkoutButton = document.getElementById('checkoutID');
    if(checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'orders.html'; // Replace 'orders.html' with the path to your target HTML file if different
        });
    }
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
    const listCartElement = document.querySelector('.ListCart');

    cartRef.get()
        .then(querySnapshot => {
            listCartElement.innerHTML = ''; // Clear any existing cart items
            let subtotal = 0; // Initialize subtotal price

            querySnapshot.forEach(doc => {
                const item = doc.data();
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img src="${item.imageUrl}" alt="${item.name}" style="width: 70px; height: auto;">
                  <div>
                    <div>${item.name}</div>
                    <div class="price">$${item.price}</div>
                    <div>Quantity: ${item.quantity}</div>
                  </div>
                </div>
                <button onclick="removeItemFromCart('${doc.id}', '${uid}')" class="remove-item-btn">Remove</button>
              </div>`;

                listCartElement.appendChild(itemElement);

                // Update subtotal price considering the quantity of each item
                subtotal += item.price * item.quantity;
            });

            // Calculate taxes based on the subtotal
            const taxRate = 0.0825; // 8.25% tax rate
            const taxAmount = subtotal * taxRate;
            const total = subtotal + taxAmount; // Total amount after adding taxes

            // Check if there are items in the cart to display the total
            if (querySnapshot.size > 0) {
                const totalElement = document.createElement('div');
                totalElement.classList.add('total');
                totalElement.innerHTML = `
                    <strong>Subtotal: $${subtotal.toFixed(2)}</strong><br>
                    <strong>Tax (8.25%): $${taxAmount.toFixed(2)}</strong><br>
                    <strong>Total: $${total.toFixed(2)}</strong>
                `; // Display subtotal, tax, and total with 2 decimal places
                listCartElement.appendChild(totalElement);
            }
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

 // Placeholder data for total amount and discount
 let totalAmount = 100.00; // Example initial total amount
 let discountPercentage = 10; // Example discount of 10%

 // Function to update the total amount displayed
 function updateTotalDisplay() {
   document.getElementById('totalAmount').textContent = '$' + totalAmount.toFixed(2);
 }

 // Function to apply the discount code
 function applyDiscount() {
   let discountCode = document.getElementById('discountCode').value;

   // Placeholder for discount code validation and application logic
   // In a real application, validate the discount code on the server side
   console.log("The entered discount code is:", discountCode);
   // For the sake of example, we apply a discount if any code is entered
   if(discountCode.trim() !== '') {
     totalAmount -= totalAmount * (discountPercentage / 100);
   }

   // Update the total amount displayed after discount
   updateTotalDisplay();
   
   // Alert the user - for real application, replace with a user-friendly message in the DOM
   alert("Discount code applied: " + discountCode);
 }

 // Initial update of the total amount on page load
 updateTotalDisplay();

// debug undefined 
function addToCart(item) {
    // Assuming 'cart' is an array holding your cart items
    if (!item || item.price === undefined || item.quantity === undefined) {
      console.error('Item is undefined or missing price/quantity', item);
      return;
    }
    cart.push(item);
    updateCartDisplay(); // Function to update the cart display
  }

  