
document.addEventListener('DOMContentLoaded', displayConfirmationDetails);

function displayConfirmationDetails() {
    // Retrieve the stored data
    const storedData = JSON.parse(localStorage.getItem('shippingData'));

    if (storedData) {
        document.getElementById('confirm-fullName').textContent = storedData.fullName;
        document.getElementById('confirm-email').textContent = storedData.email;
        document.getElementById('confirm-address').textContent = storedData.address;
        document.getElementById('confirm-phone').textContent = storedData.phone;

        // Clear the stored data if it's no longer needed
        localStorage.removeItem('shippingData');
    } else {
        // Handle the case where there is no data
        console.error('No shipping data available for confirmation.');
        // Optionally, redirect to another page or display a message
    }
}
