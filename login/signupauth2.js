// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeQmcSvoDqT6qo-WsxFjpUUuhPs-rfrRA",
    authDomain: "hectoclash.firebaseapp.com",
    projectId: "hectoclash",
    storageBucket: "hectoclash.firebasestoragef.app",
    messagingSenderId: "362838792082",
    appId: "1:362838792082:web:ef633703338293672b934b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const actionCodeSettings = {
    url: "http://127.0.0.1:3000/login/loading.html",
    handleCodeInApp: true
}
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault()


    const email = document.getElementById('email').value;
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            alert("Email sent successfully")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
});
