// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Firebase configuration object

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

const signupLink = document.querySelector(".signup a");

// Function to handle login
const login = async (email, password, rememberMe) => {
  try {
    // Set Firebase authentication persistence based on "Remember Me" checkbox
    if (rememberMe) {
      await setPersistence(auth, browserLocalPersistence); // Remember user in local storage
    } else {
      await setPersistence(auth, browserSessionPersistence); // Session persistence for one session
    }

    // Sign in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the email is verified
    if (user.emailVerified) {
      console.log('User logged in successfully and email is verified!');
      // Redirect to the home page or dashboard
      window.location.href = "/homepage/homepage.html"; // Change to your desired page
    } else {
      console.log('Email not verified.');
      alert('Please verify your email first.');
      await auth.signOut(); // Optionally log out the user if email is not verified
    }

  } catch (error) {
    console.error('Error logging in:', error.message);
    showError(error.message);
  }
};

// Function to send password reset email
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent! Please check your inbox.');
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    showError(error.message);
  }
};

// Show error message in the UI
const showError = (message) => {
  const errorDiv = document.getElementById('showError');
  errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
};

// Handle form submission for login
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Validate form inputs
  if (!email || !password) {
    showError('Please enter both email and password.');
    return;
  }

  // Call the login function
  login(email, password, rememberMe);
});

// Handle Forgot Password click
document.getElementById('forgotPassword').addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  if (!email) {
    showError('Please enter your email address to reset your password.');
    return;
  }

  sendPasswordReset(email);
});

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', (e) => {
  const passwordInput = document.getElementById('password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    e.target.textContent = '🙈'; // Change to eye-slash emoji
  } else {
    passwordInput.type = 'password';
    e.target.textContent = '👁️'; // Change to eye emoji
  }
});

signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    // Redirect to signup page
    window.location.href = "/login/signup.html"; // Replace with actual signup URL
  });