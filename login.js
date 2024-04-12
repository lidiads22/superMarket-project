    // ClIENT-SIDE javascript
    function isEmailValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

    const isPasswordSecure = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return re.test(password);
};


    document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    if (form) {
    form.addEventListener('submit', async event => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isEmailValid(email) && isPasswordSecure(password)) {
    try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("logged in successfully:", user.uid);
    // await db.collection("users").doc(user.uid).collection("cart").doc("cartId").set({
    //     cartItems: [],
    //     order: []
    // });
    // console.log("Cart initialized for new user.");
    alert("log in successful!");
    window.location.href = 'home.html'; // Redirect
} catch (error) {
    console.error("Error during log in", error.code, error.message);
    alert(error.message);
}
} else {
    console.log("Validation failed for email or password.");
}
});
} else {
    console.log('login-form not found');
}
});

    //  firebase.auth().onAuthStateChanged(function (user) {
//     const notLoggedIn = document.getElementById('not-logged-in');
//     const loggedIn = document.getElementById('logged-in');
//
//     if (user) {
//         //user is signed in
//         loggedIn.style.display = 'block';
//         notLoggedIn.style.display = 'none';
//     } else {
//         //user not signed in
//         loggedIn.style.display = 'none';
//         notLoggedIn.style.display = 'block';
//     }
// });


// function login(event) {
//     event.preventDefault()
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
//         console.log('Error signing in,',error.message)
//         alert(error.message);
//     }).then(function (user){
//             if(user){
//                 alert('Welcome back, you are logged in')
//             }
//     })
//
// }

// function logout() {
//
// }
