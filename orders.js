document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the shipping form
    const shippingForm = document.querySelector('.shipping-form');
    
    if (!shippingForm) {
      console.error('Shipping form not found on the page.');
      return; // Stop the script if the form is not found
    }
  
    // Listen for form submission
    shippingForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      
      // Get the current user
      const user = firebase.auth().currentUser;
  
      if (!user) {
        alert('No user signed in. Please sign in to submit shipping information.');
        return; // Stop the function if no user is signed in
      }
      
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
      
        // Save the form data to localStorage
        localStorage.setItem('shippingData', JSON.stringify(shippingData));
      
        // Redirect to the confirmation page
        window.location.href = 'confirmation.html'; // Make sure the file name matches your actual file
      })
      .catch(error => {
        console.error('Error adding shipping data:', error);
        alert('Failed to submit shipping information. Please try again.');
      });
    });
  });
  