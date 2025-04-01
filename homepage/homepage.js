// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Your Firebase config (replace these with your actual Firebase project details)
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

// DOM Elements
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const profileContainer = document.getElementById("profile-container");
const profileIcon = document.getElementById("profile-icon");
const profileOptions = document.getElementById("profile-options");
const myProfileBtn = document.getElementById("my-profile-btn");
const settingsBtn = document.getElementById("settings-btn");
const logoutBtn = document.getElementById("logout-btn");

// Check if user is logged in
onAuthStateChanged(auth, user => {
    if (user) {
        // User is logged in
        loginBtn.style.display = "none";
        signupBtn.style.display = "none";
        profileContainer.style.display = "block";
        profileIcon.src = user.photoURL || "/homepage/images/profile-icon.png";  // Use user's photo or default icon
    } else {
        // User is not logged in
        loginBtn.style.display = "block";
        signupBtn.style.display = "block";
        profileContainer.style.display = "none";
    }
});

// Profile icon click event to show dropdown options
profileIcon.addEventListener("click", () => {
    profileOptions.style.display = profileOptions.style.display === "block" ? "none" : "block";
});

// Handle "My Profile" button click
myProfileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";  // Redirect to My Profile page
});

// Handle "Settings" button click
settingsBtn.addEventListener("click", () => {
    window.location.href = "settings.html";  // Redirect to Settings page
});

// Handle "Logout" button click
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("User logged out");
        window.location.reload();  // Reload the page to update UI
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});
