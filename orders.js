document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the shipping form
    const shippingForm = document.querySelector('.shipping-form');
    
    // Listen for form submission
    shippingForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      
      // Get the current user
      const user = firebase.auth().currentUser;
      
      if (user) {
        // Retrieve form data
        const shippingData = {
          fullName: document.getElementById('full-name').value.trim(),
          email: document.getElementById('email').value.trim(),
          address: document.getElementById('address').value.trim(),
          phone: document.getElementById('phone').value.trim(),
          cardNumber: document.getElementById('cardNumber').value.trim(),
        };
  
        // Get a reference to the user's orders collection
        const ordersRef = firebase.firestore().collection('users').doc(user.uid).collection('orders');
        
        // Add a new document with the shipping data
        ordersRef.add({
          shippingData: shippingData,
          status: 'pending', // or any other initial order status
          createdAt: firebase.firestore.FieldValue.serverTimestamp(), // optional
        })
        .then(docRef => {
          console.log('Shipping data written with ID:', docRef.id);
          alert('Shipping information submitted successfully!');
          // Here you can redirect to another page or clear the form
        })
        .catch(error => {
          console.error('Error adding shipping data:', error);
          alert('Failed to submit shipping information. Please try again.');
        });
      } else {
        // If no user is logged in, display an error or redirect to login page
        console.error('No user logged in');
        alert('Please log in to submit shipping information.');
      }
    });
  });
  